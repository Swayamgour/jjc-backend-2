const Service = require("../models/Service");
const Category = require("../models/Category");

const { cloudinary } = require("../config/cloudinary");
const slugify = require("slugify");


/* ==============================
 JSON PARSER
 Every nested section (hero, challenges, outcomes, pillars,
 taskBoard, approach, whyUs, successStories, insights, cta,
 relatedServices, seo) is sent as a JSON string from
 multipart/form-data (because heroImage travels alongside it
 as a file), so we parse each one back into an object/array.
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

const SERVICE_JSON_FIELDS = [
  "hero",
  "challenges",
  "outcomes",
  "pillars",
  "taskBoard",
  "approach",
  "whyUs",
  "successStories",
  "insights",
  "cta",
  "relatedServices",
  "seo",
];


/* ==============================
 RESOLVE PARENT CATEGORY FROM SUBCATEGORY (ITEM)
 The frontend admin dropdown sends the 3rd-level ITEM
 _id (from Category.subcategories[].items[]) as
 `subCategory` — NOT the 2nd-level subcategory _id.
 So we must search inside the nested `items` array,
 not just `subcategories._id`.
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
 (Category -> subcategories[] -> items[]), so Mongoose's
 `.id()` helper (one level deep only) can't reach it.
 Walk the subcategories manually instead.
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
 POPULATE RELATED-SERVICES OVERRIDES
 relatedServices.items reference other Service docs but allow
 title/description/link overrides. Fill in whatever wasn't
 overridden using the referenced service.
================================ */

const hydrateRelatedServices = async (obj) => {
  const items = obj.relatedServices?.items;
  if (!items || !items.length) return obj;

  const ids = items.map((i) => i.service).filter(Boolean);
  if (!ids.length) return obj;

  const services = await Service.find(
    { _id: { $in: ids } },
    "title urlPath badge"
  ).lean();

  const byId = {};
  services.forEach((s) => (byId[String(s._id)] = s));

  obj.relatedServices.items = items.map((item) => {
    const ref = byId[String(item.service)];
    return {
      ...item,
      title: item.title || ref?.title || "",
      link: item.link || ref?.urlPath || "",
    };
  });

  return obj;
};


/* ==============================
 GET ALL SERVICES
================================ */


exports.getAllServices = async (req, res) => {
  try {
    const filter = {};

    if (req.query.subCategory) {
      filter.subCategory = req.query.subCategory;
    }

    const services = await Service.find(filter).sort({ order: 1 });

    const data = await Promise.all(
      services.map(async (service) => {
        const obj = service.toObject();

        const category = await Category.findOne(
          { "subcategories.items._id": service.subCategory },
          { subcategories: 1 }
        ).lean();

        const item = findItemById(category, service.subCategory);

        obj.subCategory = service.subCategory;
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
 GET SINGLE SERVICE
 Also returns breadcrumb pieces (category/subCategory names)
 and hydrated related-service cards, since the detail page
 needs both.
================================ */


exports.getService = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    let obj = service.toObject();

    const category = await Category.findOne(
      { "subcategories.items._id": service.subCategory },
      { subcategories: 1, name: 1, slug: 1 }
    ).lean();

    const item = findItemById(category, service.subCategory);

    obj.subCategory = service.subCategory;
    obj.subCategoryName = item?.name || "";
    obj.categoryName = category?.name || "";
    obj.categorySlug = category?.slug || "";

    obj = await hydrateRelatedServices(obj);

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
 CREATE SERVICE
================================ */


exports.createService = async (req, res) => {
  try {
    const body = { ...req.body };

    parseJsonFields(body, SERVICE_JSON_FIELDS);

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

    body.urlPath = `/services/${slugify(body.title, {
      lower: true,
      strict: true,
    })}`;

    const service = await Service.create(body);

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
 UPDATE SERVICE
================================ */


exports.updateService = async (req, res) => {
  try {
    const body = { ...req.body };

    parseJsonFields(body, SERVICE_JSON_FIELDS);

    const existingService = await Service.findOne({
      slug: req.params.slug,
    });

    if (!existingService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    /* slug update */
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

    /* duplicate slug */
    if (body.slug) {
      const exists = await Service.findOne({
        slug: body.slug,
        _id: { $ne: existingService._id },
      });

      if (exists) {
        return res.status(400).json({
          success: false,
          message: "Slug already exists",
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
      ...(existingService.hero?.toObject?.() || {}),
      ...(body.hero || {}),
    };

    const heroFile = req.files?.heroImage?.[0];

    if (heroFile) {
      const old = existingService.hero?.image?.publicId;

      body.hero.image = {
        url: heroFile.path,
        publicId: heroFile.filename,
      };

      if (old && old !== heroFile.filename) {
        await cloudinary.uploader.destroy(old);
      }
    }

    const updated = await Service.findOneAndUpdate(
      { slug: req.params.slug },
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
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
 DELETE SERVICE
================================ */


exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const hero = service.hero?.image?.publicId;

    if (hero) {
      await cloudinary.uploader.destroy(hero);
    }

    await service.deleteOne();

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
 PUBLISH
================================ */


exports.togglePublish = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    service.isPublished = !service.isPublished;

    await service.save();

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ==============================
 CATEGORY WISE SERVICES (for Home Page)
 Groups all published services by their
 top-level Category -> Subcategory, so the
 frontend can render "Services" sections
 automatically without hardcoding data.
================================ */


exports.getServicesByCategory = async (req, res) => {
  try {
    const categoryFilter = {};
    if (req.query.category) {
      categoryFilter.slug = req.query.category;
    }

    const categories = await Category.find(categoryFilter)
      .sort({ order: 1 })
      .lean();

    const services = await Service.find({ isPublished: true })
      .select(
        "title slug badge shortDescription category subCategory order urlPath"
      )
      .sort({ order: 1 })
      .lean();

    const data = categories.map((category) => {
      // Flatten every subcategory's items into one list of
      // "groups" so each item can be matched against
      // service.subCategory (which stores an item _id).
      const allItems = (category.subcategories || []).flatMap(
        (sub) => sub.items || []
      );

      const groups = allItems.map((item) => {
        const itemServices = services
          .filter(
            (service) => String(service.subCategory) === String(item._id)
          )
          .map((service) => ({
            id: service._id,
            title: service.title,
            slug: service.slug,
            badge: service.badge,
            shortDescription: service.shortDescription,
            urlPath: service.urlPath,
            order: service.order,
          }));

        return {
          id: item._id,
          name: item.name,
          slug: item.slug,
          count: itemServices.length,
          services: itemServices,
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
================================ */
exports.getMenuServices = async (req, res) => {
  try {
    const services = await Service.find({ isPublished: true })
      .select("title slug subCategory shortDescription order")
      .sort({ order: 1 });

    const categories = await Category.find({}, { subcategories: 1 }).lean();

    const grouped = {};

    for (const service of services) {
      let itemName = "";

      for (const category of categories) {
        const item = findItemById(category, service.subCategory);
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
        title: service.title,
        slug: service.slug,
        shortDescription: service.shortDescription,
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
