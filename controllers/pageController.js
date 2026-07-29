const Page = require("../models/Page");
const Category = require("../models/Category");

const { cloudinary } = require("../config/cloudinary");
const slugify = require("slugify");


/* ==============================
 VALID TYPES
 Single source of truth for the three content types this
 controller serves. `req.params.type` is validated against
 this list on every route.
================================ */

const VALID_TYPES = ["service", "industry", "platform"];

const validateType = (type) => VALID_TYPES.includes(type);


/* ==============================
 JSON PARSER
 Every nested section (hero, challenges, sectorOverview,
 applicationLayer, capabilities, industryUseCases, outcomes,
 pillars, taskBoard, consultingServices, appGrid, approach,
 whyUs, successStories, insights, cta, relatedItems, seo) is
 sent as a JSON string from multipart/form-data (because
 heroImage travels alongside it as a file), so we parse each
 one back into an object/array.
================================ */

const parseJsonFields = (body, fields) => {
  fields.forEach((field) => {
    if (body[field] && typeof body[field] === "string") {
      try {
        body[field] = JSON.parse(body[field]);
      } catch (error) {
        throw new Error(`Invalid JSON ${field}`);
      }
    }
  });
};

const PAGE_JSON_FIELDS = [
  "hero",
  "challenges",
  "sectorOverview",
  "applicationLayer",
  "capabilities",
  "industryUseCases",
  "outcomes",
  "pillars",
  "taskBoard",
  "consultingServices",
  "appGrid",
  "approach",
  "whyUs",
  "successStories",
  "insights",
  "cta",
  "relatedItems",
  "seo",
];


/* ==============================
 RESOLVE PARENT CATEGORY FROM SUBCATEGORY (ITEM)
 The admin dropdown sends the 3rd-level ITEM _id (from
 Category.subcategories[].items[]) as `subCategory` — NOT the
 2nd-level subcategory _id. So we must search inside the nested
 `items` array, not just `subcategories._id`.

 NOTE: this is type-agnostic on purpose. Your Category
 collection is expected to have one top-level doc per area
 (e.g. a "Services" doc, an "Industries" doc, a "Platforms"
 doc), each with its own subcategories/items, so the same
 lookup logic works for all three page types.
================================ */

const resolveCategoryFromSubCategory = async (subCategoryId) => {
  if (!subCategoryId) return null;

  const category = await Category.findOne(
    { "subcategories.items._id": subCategoryId },
    { _id: 1 }
  );

  return category?._id || null;
};


/* ==============================
 FIND THE ITEM (for subCategoryName in responses)
 `items` is nested two levels deep inside a Category
 (Category -> subcategories[] -> items[]), so Mongoose's `.id()`
 helper (one level deep only) can't reach it. Walk manually.
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
 POPULATE RELATED-ITEMS OVERRIDES
 relatedItems.items reference other Page docs but allow
 title/description/link overrides. Fill in whatever wasn't
 overridden using the referenced page.
================================ */

const hydrateRelatedItems = async (obj) => {
  const items = obj.relatedItems?.items;
  if (!items || !items.length) return obj;

  const ids = items.map((i) => i.page).filter(Boolean);
  if (!ids.length) return obj;

  const pages = await Page.find(
    { _id: { $in: ids } },
    "title urlPath badge type"
  ).lean();

  const byId = {};
  pages.forEach((p) => (byId[String(p._id)] = p));

  obj.relatedItems.items = items.map((item) => {
    const ref = byId[String(item.page)];
    return {
      ...item,
      title: item.title || ref?.title || "",
      link: item.link || ref?.urlPath || "",
    };
  });

  return obj;
};


/* ==============================
 GET ALL PAGES (of a given type)
 GET /api/pages/:type?subCategory=...
================================ */

exports.getAllPages = async (req, res) => {
  try {
    const { type } = req.params;

    if (!validateType(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be service, industry or platform.",
      });
    }

    const filter = { type };

    if (req.query.subCategory) {
      filter.subCategory = req.query.subCategory;
    }

    const pages = await Page.find(filter).sort({ order: 1 });

    const data = await Promise.all(
      pages.map(async (page) => {
        const obj = page.toObject();

        const category = await Category.findOne(
          { "subcategories.items._id": page.subCategory },
          { subcategories: 1 }
        ).lean();

        const item = findItemById(category, page.subCategory);

        obj.subCategory = page.subCategory;
        obj.subCategoryName = item?.name || "";

        return obj;
      })
    );

    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
 GET SINGLE PAGE
 GET /api/pages/:type/:slug
 Also returns breadcrumb pieces (category/subCategory names)
 and hydrated related items, since the detail page needs both.
================================ */

exports.getPage = async (req, res) => {
  try {
    const { type, slug } = req.params;

    if (!validateType(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be service, industry or platform.",
      });
    }

    const page = await Page.findOne({ type, slug });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: `${type} not found`,
      });
    }

    let obj = page.toObject();

    const category = await Category.findOne(
      { "subcategories.items._id": page.subCategory },
      { subcategories: 1, name: 1, slug: 1 }
    ).lean();

    const item = findItemById(category, page.subCategory);

    obj.subCategory = page.subCategory;
    obj.subCategoryName = item?.name || "";
    obj.categoryName = category?.name || "";
    obj.categorySlug = category?.slug || "";

    obj = await hydrateRelatedItems(obj);

    res.status(200).json({
      success: true,
      data: obj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
 CREATE PAGE
 POST /api/pages/:type
================================ */

exports.createPage = async (req, res) => {
  try {
    const { type } = req.params;

    if (!validateType(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be service, industry or platform.",
      });
    }

    const body = { ...req.body, type };

    parseJsonFields(body, PAGE_JSON_FIELDS);

    // default nested objects so we can safely set .hero.image etc.
    body.hero = body.hero || {};

    const heroFile = req.files?.heroImage?.[0];

    if (heroFile) {
      body.hero.image = {
        url: heroFile.path,
        publicId: heroFile.filename,
      };
    }

    // Require a subcategory selection
    if (!body.subCategory) {
      return res.status(400).json({
        success: false,
        message: "Subcategory is required",
      });
    }

    // Auto-derive the parent category from the chosen subcategory (item)
    const resolvedCategory = await resolveCategoryFromSubCategory(
      body.subCategory
    );

    if (!resolvedCategory) {
      return res.status(400).json({
        success: false,
        message: "Selected subcategory does not belong to any category",
      });
    }

    body.category = resolvedCategory;

    body.urlPath = `/${type === "service" ? "services" : type === "industry" ? "industries" : "platforms"}/${slugify(
      body.title,
      { lower: true, strict: true }
    )}`;

    const page = await Page.create(body);

    res.status(201).json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
 UPDATE PAGE
 PUT /api/pages/:type/:slug
================================ */

exports.updatePage = async (req, res) => {
  try {
    const { type, slug } = req.params;

    if (!validateType(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be service, industry or platform.",
      });
    }

    const body = { ...req.body };
    // type is never changed via update — it's fixed by the route
    delete body.type;

    parseJsonFields(body, PAGE_JSON_FIELDS);

    const existingPage = await Page.findOne({ type, slug });

    if (!existingPage) {
      return res.status(404).json({
        success: false,
        message: `${type} not found`,
      });
    }

    /* slug update */
    if (body.slug?.trim()) {
      body.slug = slugify(body.slug, { lower: true, strict: true });
    } else if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    /* duplicate slug (scoped to the same type) */
    if (body.slug) {
      const exists = await Page.findOne({
        type,
        slug: body.slug,
        _id: { $ne: existingPage._id },
      });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Slug already exists for this type",
        });
      }
    }

    /* re-derive category if subcategory changed */
    if (body.subCategory) {
      const resolvedCategory = await resolveCategoryFromSubCategory(
        body.subCategory
      );

      if (!resolvedCategory) {
        return res.status(400).json({
          success: false,
          message: "Selected subcategory does not belong to any category",
        });
      }

      body.category = resolvedCategory;
    }

    /* merge hero (so a partial update doesn't wipe existing fields) */
    body.hero = {
      ...(existingPage.hero?.toObject?.() || {}),
      ...(body.hero || {}),
    };

    const heroFile = req.files?.heroImage?.[0];

    if (heroFile) {
      const old = existingPage.hero?.image?.publicId;

      body.hero.image = {
        url: heroFile.path,
        publicId: heroFile.filename,
      };

      if (old && old !== heroFile.filename) {
        await cloudinary.uploader.destroy(old);
      }
    }

    const updated = await Page.findOneAndUpdate({ type, slug }, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: `${type} updated successfully`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
 DELETE PAGE
 DELETE /api/pages/:type/:slug
================================ */

exports.deletePage = async (req, res) => {
  try {
    const { type, slug } = req.params;

    if (!validateType(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be service, industry or platform.",
      });
    }

    const page = await Page.findOne({ type, slug });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: `${type} not found`,
      });
    }

    const hero = page.hero?.image?.publicId;

    if (hero) {
      await cloudinary.uploader.destroy(hero);
    }

    await page.deleteOne();

    res.json({
      success: true,
      message: `${type} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
 PUBLISH TOGGLE
 PATCH /api/pages/:type/:id/publish
================================ */

exports.togglePublish = async (req, res) => {
  try {
    const { type, id } = req.params;

    if (!validateType(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be service, industry or platform.",
      });
    }

    const page = await Page.findOne({ _id: id, type });

    if (!page) {
      return res.status(404).json({
        success: false,
        message: `${type} not found`,
      });
    }

    page.isPublished = !page.isPublished;

    await page.save();

    res.json({
      success: true,
      data: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
 CATEGORY-WISE PAGES (for landing pages, e.g. /services,
 /industries, /platforms)
 Groups all published pages of a given type by their top-level
 Category -> Subcategory, so the frontend can render sections
 automatically without hardcoding data.
 GET /api/pages/:type/by-category?category=slug
================================ */

exports.getPagesByCategory = async (req, res) => {
  try {
    const { type } = req.params;

    if (!validateType(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be service, industry or platform.",
      });
    }

    const categoryFilter = {};
    if (req.query.category) {
      categoryFilter.slug = req.query.category;
    }

    const categories = await Category.find(categoryFilter)
      .sort({ order: 1 })
      .lean();

    const pages = await Page.find({ type, isPublished: true })
      .select(
        "title slug badge shortDescription category subCategory order urlPath"
      )
      .sort({ order: 1 })
      .lean();

    const data = categories.map((category) => {
      const allItems = (category.subcategories || []).flatMap(
        (sub) => sub.items || []
      );

      const groups = allItems.map((item) => {
        const itemPages = pages
          .filter((page) => String(page.subCategory) === String(item._id))
          .map((page) => ({
            id: page._id,
            title: page.title,
            slug: page.slug,
            badge: page.badge,
            shortDescription: page.shortDescription,
            urlPath: page.urlPath,
            order: page.order,
          }));

        return {
          id: item._id,
          name: item.name,
          slug: item.slug,
          count: itemPages.length,
          pages: itemPages,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
 MENU GROUP BY SUBCATEGORY
 Powers the mega-menu (e.g. the "What We Do" dropdown grouping
 services under "Strategy & Transformation", "Managed IT &
 Security", etc). Works the same way for industries/platforms if
 their nav ever needs the same grouped-dropdown treatment.
 GET /api/pages/:type/menu
================================ */

exports.getMenuPages = async (req, res) => {
  try {
    const { type } = req.params;

    if (!validateType(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid type. Must be service, industry or platform.",
      });
    }

    const pages = await Page.find({ type, isPublished: true })
      .select("title slug subCategory shortDescription order")
      .sort({ order: 1 });

    const categories = await Category.find({}, { subcategories: 1 }).lean();

    const grouped = {};

    for (const page of pages) {
      let itemName = "";

      for (const category of categories) {
        const item = findItemById(category, page.subCategory);
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
        title: page.title,
        slug: page.slug,
        shortDescription: page.shortDescription,
      });
    }

    res.json({
      success: true,
      data: grouped,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
