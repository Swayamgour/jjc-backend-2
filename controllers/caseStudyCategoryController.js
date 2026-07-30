const CaseStudyCategory = require("../models/CaseStudyCategory");
const CaseStudy = require("../models/CaseStudy");
const { parseJsonFields } = require("../utils/caseStudyHelpers");

const JSON_FIELDS = ["theme", "glanceItems", "extraStats"];

/* ------------------------------------------------------------------ */
/* CREATE                                                              */
/* ------------------------------------------------------------------ */
exports.createCategory = async (req, res) => {
  try {
    const body = { ...req.body };
    parseJsonFields(body, JSON_FIELDS);

    const category = await CaseStudyCategory.create(body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* LIST (admin table + navbar "Browse by Industry/Capability" menus)   */
/* GET /api/case-study-categories?type=industry                       */
/* ------------------------------------------------------------------ */
exports.getCategories = async (req, res) => {
  try {
    const { type, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    const categories = await CaseStudyCategory.find(filter).sort({
      order: 1,
      name: 1,
    });

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* GET ONE (admin edit form)                                           */
/* ------------------------------------------------------------------ */
exports.getCategoryById = async (req, res) => {
  try {
    const category = await CaseStudyCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* PUBLIC — full listing page payload                                  */
/* GET /api/case-study-categories/page/:type/:slug                     */
/* Powers SuccessIndustryHealthcare.jsx / SuccessCapability*.jsx        */
/* Returns { category, stats, caseStudies } in one call.                */
/* ------------------------------------------------------------------ */
exports.getCategoryPage = async (req, res) => {
  try {
    const { type, slug } = req.params;

    if (!["industry", "capability"].includes(type)) {
      return res.status(400).json({ success: false, message: "type must be 'industry' or 'capability'" });
    }

    const category = await CaseStudyCategory.findOne({ slug, type, status: "published" });
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const caseStudies = await CaseStudy.find({
      sourceType: type,
      parent: category._id,
      status: "published",
    }).sort({ isGap: 1, createdAt: -1 }); // real stories first, gap slots last

    const realStories = caseStudies.filter((c) => !c.isGap);

    const stats = {
      sourcedOutcomes: realStories.length,
      extraStats: category.extraStats || [],
    };

    res.status(200).json({
      success: true,
      data: { category, stats, caseStudies },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* UPDATE                                                               */
/* ------------------------------------------------------------------ */
exports.updateCategory = async (req, res) => {
  try {
    const body = { ...req.body };
    parseJsonFields(body, JSON_FIELDS);

    const category = await CaseStudyCategory.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* DELETE                                                               */
/* ------------------------------------------------------------------ */
exports.deleteCategory = async (req, res) => {
  try {
    const inUse = await CaseStudy.countDocuments({ parent: req.params.id });
    if (inUse > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete: ${inUse} case study(ies) still reference this category`,
      });
    }

    const category = await CaseStudyCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
