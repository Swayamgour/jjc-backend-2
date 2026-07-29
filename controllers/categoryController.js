const Category = require("../models/Category");
const slugify = require("slugify");

const makeSlug = (str) => slugify(str, { lower: true, strict: true });

// ---------------- CATEGORY (Level 1: Services, Industries, Platforms) ----------------

exports.createCategory = async (req, res) => {
  try {
    const exists = await Category.findOne({ name: req.body.name });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create(req.body);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 }).lean();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isPublished: true,
    }).lean();

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error("Get Category Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET ALL ITEMS OF A CATEGORY (FLATTENED) =================
// e.g. GET /api/categories/services/items
// Returns every item from every subcategory as one flat array
exports.getAllItemsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({
      slug,
      isPublished: true,
    }).lean();

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const allItems = (category.subcategories || []).flatMap(
      (sub) => sub.items || []
    );

    res.status(200).json({
      success: true,
      count: allItems.length,
      data: allItems,
    });
  } catch (error) {
    console.error("Get All Items Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const body = { ...req.body };

    const existingCategory = await Category.findById(req.params.id);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (body.name) {
      body.slug = makeSlug(body.name);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Update Category Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete Category Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------- SUBCATEGORY (Level 2: Strategy & Transformation, Managed IT & Security) ----------------

exports.addSubcategory = async (req, res) => {
  try {
    const { name, slug, icon, order } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name is required",
      });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const exists = category.subcategories.some(
      (sub) => sub.name.toLowerCase() === name.toLowerCase(),
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Subcategory already exists",
      });
    }

    const finalSlug = makeSlug(slug?.trim() || name);

    const slugExists = category.subcategories.some(
      (sub) => sub.slug === finalSlug,
    );

    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "Subcategory slug already exists",
      });
    }

    category.subcategories.push({
      name: name.trim(),
      slug: slug?.trim(),
      icon,
      order,
      items: [],
    });

    await category.save();

    res.status(200).json({
      success: true,
      message: "Subcategory added successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSubcategory = async (req, res) => {
  try {
    const { name, slug, icon, order } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name is required",
      });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const subcategory = category.subcategories.id(req.params.subId);

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const exists = category.subcategories.some(
      (sub) =>
        sub._id.toString() !== req.params.subId &&
        sub.name.toLowerCase() === name.toLowerCase(),
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Subcategory already exists",
      });
    }

    const finalSlug = makeSlug(slug?.trim() || name);

    const slugExists = category.subcategories.some(
      (sub) =>
        sub._id.toString() !== req.params.subId && sub.slug === finalSlug,
    );

    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "Subcategory slug already exists",
      });
    }

    subcategory.name = name.trim();
    subcategory.slug = slug !== undefined ? slug.trim() : "";
    if (icon !== undefined) subcategory.icon = icon;
    if (order !== undefined) subcategory.order = order;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Update Subcategory Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteSubcategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const subcategory = category.subcategories.id(req.params.subId);

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    subcategory.deleteOne();

    await category.save();

    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
      data: category,
    });
  } catch (error) {
    console.error("Delete Subcategory Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------- ITEM (Level 3: IT Strategy & Consulting, AI Readiness...) ----------------

exports.addItem = async (req, res) => {
  try {
    const { name, slug, icon, description, order } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Item name is required",
      });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const subcategory = category.subcategories.id(req.params.subId);

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const exists = subcategory.items.some(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Item already exists",
      });
    }

    const finalSlug = makeSlug(slug?.trim() || name);

    const slugExists = subcategory.items.some(
      (item) => item.slug === finalSlug,
    );

    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "Item slug already exists",
      });
    }

    subcategory.items.push({
      name: name.trim(),
      slug: slug?.trim(),
      icon,
      description,
      order,
    });

    await category.save();

    res.status(200).json({
      success: true,
      message: "Item added successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { name, slug, icon, description, order } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Item name is required",
      });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const subcategory = category.subcategories.id(req.params.subId);

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const item = subcategory.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const exists = subcategory.items.some(
      (i) =>
        i._id.toString() !== req.params.itemId &&
        i.name.toLowerCase() === name.toLowerCase(),
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Item already exists",
      });
    }

    const finalSlug = makeSlug(slug?.trim() || name);

    const slugExists = subcategory.items.some(
      (i) => i._id.toString() !== req.params.itemId && i.slug === finalSlug,
    );

    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "Item slug already exists",
      });
    }

    item.name = name.trim();
    item.slug = slug !== undefined ? slug.trim() : "";
    if (icon !== undefined) item.icon = icon;
    if (description !== undefined) item.description = description;
    if (order !== undefined) item.order = order;

    await category.save();

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Update Item Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const subcategory = category.subcategories.id(req.params.subId);

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const item = subcategory.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    item.deleteOne();

    await category.save();

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: category,
    });
  } catch (error) {
    console.error("Delete Item Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};