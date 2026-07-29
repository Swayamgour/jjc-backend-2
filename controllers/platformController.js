const Platform = require("../models/Platform");
const Category = require("../models/Category");
const { cloudinary } = require("../config/cloudinary");
const slugify = require("slugify");
const parseJsonFields = require("../utils/parseJsonFields");


exports.getAllPlatforms = async (req, res) => {
  try {
    const filter = {};

    if (req.query.subCategory) {
      filter.subCategory = req.query.subCategory;
    }

    const platforms = await Platform.find(filter).sort({ order: 1 });

    const data = await Promise.all(
      platforms.map(async (platform) => {
        const obj = platform.toObject();

        const category = await Category.findOne(
          { "subcategories._id": platform.subCategory },
          { subcategories: 1 }
        );

        if (category) {
          const subCategory = category.subcategories.id(platform.subCategory);

          obj.subCategory = platform.subCategory;
          obj.subCategoryName = subCategory?.name || "";
        } else {
          obj.subCategory = platform.subCategory;
          obj.subCategoryName = "";
        }

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

exports.getPlatform = async (req, res) => {
  try {
    const platform = await Platform.findOne({ slug: req.params.slug });

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    const platformObj = platform.toObject();

    const category = await Category.findOne(
      { "subcategories._id": platform.subCategory },
      { subcategories: 1 }
    );

    if (category) {
      const subCategory = category.subcategories.id(platform.subCategory);

      platformObj.subCategory = platform.subCategory;
      platformObj.subCategoryName = subCategory?.name || "";
    } else {
      platformObj.subCategory = platform.subCategory;
      platformObj.subCategoryName = "";
    }

    res.status(200).json({
      success: true,
      data: platformObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.createPlatform = async (req, res) => {
  try {
    const body = { ...req.body };

    const jsonFields = [
      "breadcrumb",
      "hero",
      "overview",
      "capabilities",
      "benefits",
      "implementationProcess",
      "industries",
      "caseStudies",
      "faqs",
      "cta",
      "theme",
      "seo",
    ];

    parseJsonFields(body, jsonFields);

    body.hero = body.hero || {};
    body.overview = body.overview || {};

    const heroFile = req.files?.heroImage?.[0];
    const overviewFile = req.files?.overviewImage?.[0];

    if (heroFile) {
      body.hero.image = {
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

    if (!body.subCategory) {
      return res.status(400).json({
        success: false,
        message: "Subcategory is required",
      });
    }

    body.urlPath = `/platforms/${slugify(body.title, {
      lower: true,
      strict: true,
    })}`;

    const platform = await Platform.create(body);

    res.status(201).json({
      success: true,
      data: platform,
    });
  } catch (error) {
    console.error("Create Platform Error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updatePlatform = async (req, res) => {
  try {
    const body = { ...req.body };

    const jsonFields = [
      "breadcrumb",
      "hero",
      "overview",
      "capabilities",
      "benefits",
      "implementationProcess",
      "industries",
      "caseStudies",
      "faqs",
      "cta",
      "theme",
      "seo",
    ];

    parseJsonFields(body, jsonFields);

    const existingPlatform = await Platform.findOne({
      slug: req.params.slug,
    });

    if (!existingPlatform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
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

    const slugExists = await Platform.findOne({
      slug: body.slug,
      _id: { $ne: existingPlatform._id },
    });

    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists. Please choose another.",
      });
    }

    body.hero = {
      ...(existingPlatform.hero?.toObject?.() || {}),
      ...(body.hero || {}),
    };

    body.overview = {
      ...(existingPlatform.overview?.toObject?.() || {}),
      ...(body.overview || {}),
    };

    const heroFile = req.files?.heroImage?.[0];
    const overviewFile = req.files?.overviewImage?.[0];

    if (heroFile) {
      const oldHeroPublicId = existingPlatform.hero?.image?.publicId;

      body.hero.image = {
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
      const oldOverviewPublicId = existingPlatform.overview?.image?.publicId;

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

    const updatedPlatform = await Platform.findOneAndUpdate(
      { slug: req.params.slug },
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Platform updated successfully",
      data: updatedPlatform,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


exports.deletePlatform = async (req, res) => {
  try {
    const platform = await Platform.findOne({ slug: req.params.slug });

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    const heroPublicId = platform.hero?.image?.publicId;

    if (heroPublicId) {
      try {
        await cloudinary.uploader.destroy(heroPublicId);
      } catch (err) {
        console.error("Hero image delete error:", err);
      }
    }

    const overviewPublicId = platform.overview?.image?.publicId;

    if (overviewPublicId) {
      try {
        await cloudinary.uploader.destroy(overviewPublicId);
      } catch (err) {
        console.error("Overview image delete error:", err);
      }
    }

    await platform.deleteOne();

    res.status(200).json({
      success: true,
      message: "Platform deleted successfully",
    });
  } catch (error) {
    console.error("Delete Platform Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.togglePublish = async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    platform.isPublished = !platform.isPublished;

    await platform.save();

    res.status(200).json({
      success: true,
      data: platform,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// group by subcategory name (used in nav menu)
exports.getMenuPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find({ isPublished: true })
      .select("title slug subCategory shortDescription order")
      .sort({ order: 1 });

    const grouped = {};

    for (const platform of platforms) {
      const category = await Category.findOne(
        { "subcategories._id": platform.subCategory },
        { subcategories: 1 }
      );

      if (!category) continue;

      const subCategory = category.subcategories.id(platform.subCategory);

      if (!subCategory) continue;

      if (!grouped[subCategory.name]) {
        grouped[subCategory.name] = [];
      }

      grouped[subCategory.name].push({
        title: platform.title,
        slug: platform.slug,
        shortDescription: platform.shortDescription,
      });
    }

    res.status(200).json({
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


/* ==============================
 CATEGORY WISE PLATFORMS (for Home Page)
 Groups all published platforms by their
 top-level Category -> Subcategory.
================================ */
exports.getPlatformsByCategory = async (req, res) => {
  try {
    const categoryFilter = {};
    if (req.query.category) {
      categoryFilter.slug = req.query.category;
    }

    const categories = await Category.find(categoryFilter)
      .sort({ order: 1 })
      .lean();

    const platforms = await Platform.find({ isPublished: true })
      .select("title slug badge shortDescription subCategory order urlPath theme")
      .sort({ order: 1 })
      .lean();

    const data = categories.map((category) => {
      const subcategories = (category.subcategories || []).map((sub) => {
        const subPlatforms = platforms
          .filter(
            (platform) => String(platform.subCategory) === String(sub._id)
          )
          .map((platform) => ({
            id: platform._id,
            title: platform.title,
            slug: platform.slug,
            badge: platform.badge,
            shortDescription: platform.shortDescription,
            urlPath: platform.urlPath,
            theme: platform.theme,
            order: platform.order,
          }));

        return {
          id: sub._id,
          name: sub.name,
          slug: sub.slug,
          count: subPlatforms.length,
          platforms: subPlatforms,
        };
      });

      const totalCount = subcategories.reduce(
        (sum, sub) => sum + sub.count,
        0
      );

      return {
        id: category._id,
        name: category.name,
        slug: category.slug,
        order: category.order,
        count: totalCount,
        subcategories: subcategories.filter((sub) => sub.count > 0),
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