const Industry = require("../models/Industry");
const parseJsonFields = require("../utils/parseJsonFields");
const { cloudinary } = require("../config/cloudinary");
const slugify = require("slugify");
const Category = require("../models/Category");

/* ==============================
 FIND THE ITEM (for subCategoryName in responses)
 `subCategory` on Industry now stores the 3rd-level ITEM
 _id (Category.subcategories[].items[]), not the 2nd-level
 subcategory _id — Mongoose's `.id()` only reaches one
 level deep, so walk the subcategories manually.
================================ */

const findItemById = (category, itemId) => {
  if (!category || !itemId) return null;

  for (const sub of category.subcategories || []) {
    const item = (sub.items || []).find(
      (it) => String(it._id) === String(itemId)
    );
    if (item) return item;
  }

  return null;
};

/* ==============================
 COERCE BOOLEAN-LIKE FIELDS
 Multipart/JSON payloads sometimes send "" instead of
 true/false for boolean fields (e.g. an unchecked toggle
 with no value). Mongoose can't cast "" to Boolean, so
 normalize known boolean fields before saving.
================================ */

const coerceBoolean = (value, fallback = false) => {
  if (value === "" || value === undefined || value === null) return fallback;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value === "true";
  return Boolean(value);
};

const sanitizeIndustryBooleans = (body) => {
  if (body.solutions && "alignLeft" in body.solutions) {
    body.solutions.alignLeft = coerceBoolean(body.solutions.alignLeft);
  }
};

// ================= GET ALL INDUSTRIES =================
// NOTE: `subCategory` is a nested subdocument _id inside
// Category.subcategories[].items[], not a separate
// collection — it has no `ref`, so `.populate("subCategory")`
// throws a strictPopulate error. Resolved manually instead,
// same pattern as serviceController / platformController.
exports.getAllIndustries = async (req, res) => {
  try {
    const filter = {};

    if (req.query.subCategory) {
      filter.subCategory = req.query.subCategory;
    }

    const industries = await Industry.find(filter).sort({ order: 1 });

    const data = await Promise.all(
      industries.map(async (industry) => {
        const obj = industry.toObject();

        const category = await Category.findOne(
          { "subcategories.items._id": industry.subCategory },
          { subcategories: 1 }
        ).lean();

        const item = findItemById(category, industry.subCategory);

        obj.subCategory = industry.subCategory;
        obj.subCategoryName = item?.name || "";

        return obj;
      })
    );

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET SINGLE INDUSTRY =================
exports.getIndustry = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1. Try a direct industry slug match
    let industry = await Industry.findOne({ slug });

    if (industry) {
      const obj = industry.toObject();

      const category = await Category.findOne(
        { "subcategories.items._id": industry.subCategory },
        { subcategories: 1 }
      ).lean();

      const item = findItemById(category, industry.subCategory);
      obj.subCategoryName = item?.name || "";

      return res.status(200).json({
        success: true,
        data: obj,
      });
    }

    // 2. Fall back to an item slug inside a Category
    const category = await Category.findOne({
      "subcategories.items.slug": slug,
    }).lean();

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Industry not found",
      });
    }

    let matchedItem = null;
    for (const sub of category.subcategories || []) {
      matchedItem = (sub.items || []).find((it) => it.slug === slug);
      if (matchedItem) break;
    }

    if (!matchedItem) {
      return res.status(404).json({
        success: false,
        message: "Industry not found",
      });
    }

    // 3. Find the industry linked to that item
    industry = await Industry.findOne({
      subCategory: matchedItem._id,
    });

    if (!industry) {
      return res.status(404).json({
        success: false,
        message: "Industry data not found",
      });
    }

    const obj = industry.toObject();
    obj.subCategoryName = matchedItem.name;

    return res.status(200).json({
      success: true,
      data: obj,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= CREATE INDUSTRY =================
exports.createIndustry = async (req, res) => {
  try {
    const body = { ...req.body };

    const jsonFields = [
      "breadcrumb",
      "hero",
      "theme",
      "overview",
      "solutions",
      "benefits",
      "implementationProcess",
      "technologies",
      "caseStudies",
      "faqs",
      "cta",
      "seo",
    ];

    parseJsonFields(body, jsonFields);

    body.hero = body.hero || {};
    body.overview = body.overview || {};
    body.theme = body.theme || {};

    if (!body.subCategory) {
      return res.status(400).json({
        success: false,
        message: "Subcategory is required",
      });
    }

    // Fix "" -> Boolean cast errors (e.g. solutions.alignLeft)
    sanitizeIndustryBooleans(body);

    const heroFile = req.files?.heroImage?.[0];
    const overviewFile = req.files?.overviewImage?.[0];

    if (heroFile) {
      body.hero.heroImage = {
        url: heroFile.path,
        publicId: heroFile.filename,
      };
    }

    if (overviewFile) {
      body.overview.image = {
        url: overviewFile.path,
        publicId: overviewFile.filename,
      };
    }

    const industry = await Industry.create(body);

    res.status(201).json({
      success: true,
      data: industry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPDATE INDUSTRY =================
exports.updateIndustry = async (req, res) => {
  try {
    const body = { ...req.body };

    const jsonFields = [
      "breadcrumb",
      "hero",
      "theme",
      "overview",
      "solutions",
      "benefits",
      "implementationProcess",
      "technologies",
      "caseStudies",
      "faqs",
      "cta",
      "seo",
    ];

    parseJsonFields(body, jsonFields);

    const existingIndustry = await Industry.findOne({
      slug: req.params.slug,
    });

    if (!existingIndustry) {
      return res.status(404).json({
        success: false,
        message: "Industry not found",
      });
    }

    if (body.slug?.trim()) {
      body.slug = slugify(body.slug, {
        lower: true,
        strict: true,
      });
    } else if (body.title) {
      body.slug = slugify(body.title, {
        lower: true,
        strict: true,
      });
    }

    body.urlPath = `/industries/${body.slug}`;

    const slugExists = await Industry.findOne({
      slug: body.slug,
      _id: { $ne: existingIndustry._id },
    });

    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists. Please choose another.",
      });
    }

    body.hero = {
      ...(existingIndustry.hero?.toObject?.() || {}),
      ...(body.hero || {}),
    };

    body.theme = {
      ...(existingIndustry.theme?.toObject?.() || {}),
      ...(body.theme || {}),
    };

    body.overview = {
      ...(existingIndustry.overview?.toObject?.() || {}),
      ...(body.overview || {}),
    };

    body.solutions = {
      ...(existingIndustry.solutions?.toObject?.() || {}),
      ...(body.solutions || {}),
    };

    body.benefits = {
      ...(existingIndustry.benefits?.toObject?.() || {}),
      ...(body.benefits || {}),
    };

    body.implementationProcess = {
      ...(existingIndustry.implementationProcess?.toObject?.() || {}),
      ...(body.implementationProcess || {}),
    };

    body.technologies = {
      ...(existingIndustry.technologies?.toObject?.() || {}),
      ...(body.technologies || {}),
    };

    body.caseStudies = {
      ...(existingIndustry.caseStudies?.toObject?.() || {}),
      ...(body.caseStudies || {}),
    };

    body.faqs = {
      ...(existingIndustry.faqs?.toObject?.() || {}),
      ...(body.faqs || {}),
    };

    body.cta = {
      ...(existingIndustry.cta?.toObject?.() || {}),
      ...(body.cta || {}),
    };

    body.seo = {
      ...(existingIndustry.seo?.toObject?.() || {}),
      ...(body.seo || {}),
    };

    // Fix "" -> Boolean cast errors (e.g. solutions.alignLeft)
    sanitizeIndustryBooleans(body);

    const heroFile = req.files?.heroImage?.[0];
    const overviewFile = req.files?.overviewImage?.[0];

    if (heroFile) {
      const oldHeroPublicId = existingIndustry.hero?.heroImage?.publicId;

      body.hero.heroImage = {
        url: heroFile.path,
        publicId: heroFile.filename,
      };

      if (oldHeroPublicId && oldHeroPublicId !== heroFile.filename) {
        try {
          await cloudinary.uploader.destroy(oldHeroPublicId);
        } catch (err) {
          console.error("Hero image delete error:", err);
        }
      }
    }

    if (overviewFile) {
      const oldOverviewPublicId = existingIndustry.overview?.image?.publicId;

      body.overview.image = {
        url: overviewFile.path,
        publicId: overviewFile.filename,
      };

      if (
        oldOverviewPublicId &&
        oldOverviewPublicId !== overviewFile.filename
      ) {
        try {
          await cloudinary.uploader.destroy(oldOverviewPublicId);
        } catch (err) {
          console.error("Overview image delete error:", err);
        }
      }
    }

    const updatedIndustry = await Industry.findOneAndUpdate(
      { slug: req.params.slug },
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Industry updated successfully",
      data: updatedIndustry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE INDUSTRY =================
exports.deleteIndustry = async (req, res) => {
  try {
    const industry = await Industry.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!industry) {
      return res.status(404).json({
        success: false,
        message: "Industry not found",
      });
    }

    const heroPublicId = industry.hero?.heroImage?.publicId;

    if (heroPublicId) {
      try {
        await cloudinary.uploader.destroy(heroPublicId);
      } catch (err) {
        console.error("Hero image delete error:", err);
      }
    }

    const overviewPublicId = industry.overview?.image?.publicId;

    if (overviewPublicId) {
      try {
        await cloudinary.uploader.destroy(overviewPublicId);
      } catch (err) {
        console.error("Overview image delete error:", err);
      }
    }

    await industry.deleteOne();

    res.status(200).json({
      success: true,
      message: "Industry deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= TOGGLE PUBLISH =================
exports.togglePublish = async (req, res) => {
  try {
    const industry = await Industry.findById(req.params.id);

    if (!industry) {
      return res.status(404).json({
        success: false,
        message: "Industry not found",
      });
    }

    industry.isPublished = !industry.isPublished;

    await industry.save();

    res.status(200).json({
      success: true,
      message: industry.isPublished
        ? "Published successfully"
        : "Unpublished successfully",
      data: industry,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= MENU GROUP BY SUBCATEGORY =================
exports.getMenuIndustries = async (req, res) => {
  try {
    const industries = await Industry.find({ isPublished: true })
      .select("title slug subCategory order")
      .sort({ order: 1 });

    const categories = await Category.find({}, { subcategories: 1 }).lean();

    const grouped = {};

    for (const industry of industries) {
      let itemName = "";

      for (const category of categories) {
        const item = findItemById(category, industry.subCategory);
        if (item) {
          itemName = item.name;
          break;
        }
      }

      if (!itemName) continue;

      if (!grouped[itemName]) {
        grouped[itemName] = [];
      }

      grouped[itemName].push({
        title: industry.title,
        slug: industry.slug,
      });
    }

    res.status(200).json({
      success: true,
      data: grouped,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= CATEGORY WISE INDUSTRIES (for Home Page) =================
exports.getIndustriesByCategory = async (req, res) => {
  try {
    const categoryFilter = {};
    if (req.query.category) {
      categoryFilter.slug = req.query.category;
    }

    const categories = await Category.find(categoryFilter)
      .sort({ order: 1 })
      .lean();

    const industries = await Industry.find({ isPublished: true })
      .select("title slug badge subCategory order urlPath theme")
      .sort({ order: 1 })
      .lean();

    const data = categories.map((category) => {
      // Flatten every subcategory's items — industry.subCategory
      // stores an item-level _id, not a subcategory-level _id.
      const allItems = (category.subcategories || []).flatMap(
        (sub) => sub.items || []
      );

      const groups = allItems.map((item) => {
        const itemIndustries = industries
          .filter(
            (industry) => String(industry.subCategory) === String(item._id)
          )
          .map((industry) => ({
            id: industry._id,
            title: industry.title,
            slug: industry.slug,
            badge: industry.badge,
            urlPath: industry.urlPath,
            theme: industry.theme,
            order: industry.order,
          }));

        return {
          id: item._id,
          name: item.name,
          slug: item.slug,
          count: itemIndustries.length,
          industries: itemIndustries,
        };
      });

      const totalCount = groups.reduce((sum, g) => sum + g.count, 0);

      return {
        id: category._id,
        name: category.name,
        slug: category.slug,
        order: category.order,
        count: totalCount,
        subcategories: groups.filter((g) => g.count > 0),
      };
    });

    res.status(200).json({
      success: true,
      count: data.length,
      data: req.query.category ? data[0] || null : data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};