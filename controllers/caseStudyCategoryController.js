const slugify = require("slugify");
const CaseStudyCategory = require("../models/CaseStudyCategory");

exports.createCaseStudyCategory = async (req, res) => {
  try {
    const body = { ...req.body };

    if (typeof body.theme === "string") {
      body.theme = JSON.parse(body.theme);
    }

    if (!["industry", "capability"].includes(body.type)) {
      return res.status(400).json({
        success: false,
        message: "type must be 'industry' or 'capability'",
      });
    }

    body.slug = slugify(body.name, { lower: true, strict: true });

    const category = await CaseStudyCategory.create(body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /api/case-study-categories?type=industry
exports.getCaseStudyCategories = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;

    const categories = await CaseStudyCategory.find(filter).sort({
      order: 1,
      name: 1,
    });

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateCaseStudyCategory = async (req, res) => {
  try {
    const body = { ...req.body };
    if (typeof body.theme === "string") {
      body.theme = JSON.parse(body.theme);
    }
    if (body.name) {
      body.slug = slugify(body.name, { lower: true, strict: true });
    }

    const category = await CaseStudyCategory.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteCaseStudyCategory = async (req, res) => {
  try {
    const category = await CaseStudyCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
