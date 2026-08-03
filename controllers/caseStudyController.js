const slugify = require("slugify");
const CaseStudy = require("../models/CaseStudy");
const CaseStudyCategory = require("../models/CaseStudyCategory");

const {
  parseJsonFields,
  resolveParentCategory,
} = require("../utils/caseStudyHelpers");

const JSON_FIELDS = [
  "heroSection",
  "successStories",
  "relatedCapabilities",
  "ctaSection",
  "seo",
];

const parseBody = (body) => {
  parseJsonFields(body, JSON_FIELDS);
  return body;
};

/* -------------------------------------------------------------------------- */
/* CREATE */
/* -------------------------------------------------------------------------- */

exports.createCaseStudy = async (req, res) => {
  try {
    const body = parseBody({ ...req.body });

    if (!body.sourceType) {
      return res.status(400).json({
        success: false,
        message: "sourceType is required",
      });
    }

    if (!body.parentSlug) {
      return res.status(400).json({
        success: false,
        message: "parentSlug is required",
      });
    }

    const parentCategory = await resolveParentCategory(
      body.sourceType,
      body.parentSlug
    );

    if (!parentCategory) {
      return res.status(400).json({
        success: false,
        message: "Parent category not found",
      });
    }

    body.parent = parentCategory._id;

    delete body.parentSlug;

    if (!body.slug && body.name) {
      body.slug = slugify(body.name, {
        lower: true,
        strict: true,
      });
    }

    const heroImage = req.files?.heroImage?.[0];

    if (heroImage) {
      body.heroImage = {
        url: heroImage.path,
        publicId: heroImage.filename,
      };
    }

    const page = await CaseStudy.create(body);

    return res.status(201).json({
      success: true,
      data: page,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* GET ALL */
/* -------------------------------------------------------------------------- */

exports.getCaseStudies = async (req, res) => {
  try {
    const { sourceType, status } = req.query;

    const filter = {};

    if (sourceType) {
      filter.sourceType = sourceType;
    }

    if (status) {
      filter.status = status;
    }

    const pages = await CaseStudy.find(filter)
      .populate("parent")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: pages.length,
      data: pages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* GET BY ID */
/* -------------------------------------------------------------------------- */

exports.getCaseStudyById = async (req, res) => {
  try {
    const page = await CaseStudy.findById(req.params.id).populate(
      "parent"
    );

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Case study not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* GET BY SLUG */
/* -------------------------------------------------------------------------- */



exports.getCaseStudyBySlug = async (req, res) => {
  try {
    let page = await CaseStudy.findOne({
      slug: req.params.slug,
      status: "published",
    }).populate("parent");

    if (!page) {
      const category = await CaseStudyCategory.findOne({
        slug: req.params.slug,
      });

      if (category) {
        page = await CaseStudy.findOne({
          parent: category._id,
          status: "published",
        }).populate("parent");
      }
    }

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Case study not found",
      });
    }

    res.status(200).json({
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
/* -------------------------------------------------------------------------- */
/* UPDATE */
/* -------------------------------------------------------------------------- */

exports.updateCaseStudy = async (req, res) => {
  try {
    const body = parseBody({ ...req.body });

    if (body.parentSlug) {
      const parentCategory = await resolveParentCategory(
        body.sourceType,
        body.parentSlug
      );

      if (parentCategory) {
        body.parent = parentCategory._id;
      }

      delete body.parentSlug;
    }

    if (body.name) {
      body.slug = slugify(body.name, {
        lower: true,
        strict: true,
      });
    }

    const heroImage = req.files?.heroImage?.[0];

    if (heroImage) {
      body.heroImage = {
        url: heroImage.path,
        publicId: heroImage.filename,
      };
    }

    const page = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Case study not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: page,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* DELETE */
/* -------------------------------------------------------------------------- */

exports.deleteCaseStudy = async (req, res) => {
  try {
    const page = await CaseStudy.findByIdAndDelete(
      req.params.id
    );

    if (!page) {
      return res.status(404).json({
        success: false,
        message: "Case study not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};