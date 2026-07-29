const slugify = require("slugify");
const CaseStudy = require("../models/CaseStudy");
const CaseStudyCategory = require("../models/CaseStudyCategory");
const {
  parseJsonFields,
  resolveParentCategory,
} = require("../utils/caseStudyHelpers");

const JSON_FIELDS = [
  "techBadges",
  "heroStats",
  "clientInfo",
  "overview",
  "challenge",
  "solution",
  "approach",
  "results",
  "technologies",
  "beforeAfter",
  "testimonial",
  "faqs",
  "resources",
  "moreStories",
];

/* ------------------------------------------------------------------ */
/* CREATE                                                              */
/* ------------------------------------------------------------------ */
exports.createCaseStudy = async (req, res) => {
  try {
    const body = { ...req.body };

    parseJsonFields(body, JSON_FIELDS);

    // defaults for nested objects that might get partial file data merged in
    body.testimonial = body.testimonial || {};

    if (!body.sourceType || !["industry", "capability"].includes(body.sourceType)) {
      return res.status(400).json({
        success: false,
        message: "sourceType must be 'industry' or 'capability'",
      });
    }

    if (!body.parentSlug) {
      return res.status(400).json({
        success: false,
        message: "parentSlug is required (the Industry/Capability slug)",
      });
    }

    const parentCategory = await resolveParentCategory(
      body.sourceType,
      body.parentSlug
    );

    if (!parentCategory) {
      return res.status(400).json({
        success: false,
        message: `No ${body.sourceType} category found for slug "${body.parentSlug}"`,
      });
    }

    body.parent = parentCategory._id;
    delete body.parentSlug;

    // ---- files (cloudinary) ----
    const heroFile = req.files?.heroImage?.[0];
    const testimonialFile = req.files?.testimonialImage?.[0];
    const galleryFiles = req.files?.galleryImages || [];

    if (heroFile) {
      body.heroImage = { url: heroFile.path, publicId: heroFile.filename };
    }

    if (testimonialFile) {
      body.testimonial.image = {
        url: testimonialFile.path,
        publicId: testimonialFile.filename,
      };
    }

    if (galleryFiles.length) {
      body.gallery = galleryFiles.map((f) => ({
        url: f.path,
        publicId: f.filename,
      }));
    }

    body.slug = slugify(body.title, { lower: true, strict: true });

    const caseStudy = await CaseStudy.create(body);

    res.status(201).json({ success: true, data: caseStudy });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* LIST  — powers both "Browse By Industry" and "Browse By Capability" */
/* GET /api/case-studies?sourceType=industry&parentSlug=healthcare      */
/* ------------------------------------------------------------------ */
exports.getCaseStudies = async (req, res) => {
  try {
    const { sourceType, parentSlug, status } = req.query;
    const filter = {};

    if (sourceType) filter.sourceType = sourceType;
    filter.status = status || "published";

    if (parentSlug) {
      const parentCategory = await CaseStudyCategory.findOne({
        slug: parentSlug,
        ...(sourceType ? { type: sourceType } : {}),
      });
      if (!parentCategory) {
        return res.status(200).json({ success: true, data: [] });
      }
      filter.parent = parentCategory._id;
    }

    const caseStudies = await CaseStudy.find(filter)
      .populate("parent", "name slug type theme icon")
      .select(
        "title slug description heroImage techBadges heroStats sourceType parent status createdAt"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: caseStudies });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* GET ONE by slug — full detail page payload                          */
/* ------------------------------------------------------------------ */
exports.getCaseStudyBySlug = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findOne({
      slug: req.params.slug,
      status: "published",
    }).populate("parent", "name slug type theme icon");

    if (!caseStudy) {
      return res
        .status(404)
        .json({ success: false, message: "Case study not found" });
    }

    res.status(200).json({ success: true, data: caseStudy });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* UPDATE                                                               */
/* ------------------------------------------------------------------ */
exports.updateCaseStudy = async (req, res) => {
  try {
    const body = { ...req.body };
    parseJsonFields(body, JSON_FIELDS);

    if (body.sourceType && body.parentSlug) {
      const parentCategory = await resolveParentCategory(
        body.sourceType,
        body.parentSlug
      );
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          message: `No ${body.sourceType} category found for slug "${body.parentSlug}"`,
        });
      }
      body.parent = parentCategory._id;
    }
    delete body.parentSlug;

    const heroFile = req.files?.heroImage?.[0];
    const testimonialFile = req.files?.testimonialImage?.[0];
    const galleryFiles = req.files?.galleryImages || [];

    if (heroFile) {
      body.heroImage = { url: heroFile.path, publicId: heroFile.filename };
    }
    if (testimonialFile) {
      body.testimonial = body.testimonial || {};
      body.testimonial.image = {
        url: testimonialFile.path,
        publicId: testimonialFile.filename,
      };
    }
    if (galleryFiles.length) {
      body.gallery = galleryFiles.map((f) => ({
        url: f.path,
        publicId: f.filename,
      }));
    }

    if (body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    const caseStudy = await CaseStudy.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );


    // const caseStudy = await CaseStudy.findOneAndUpdate(
    //   { slug: req.params.slug },
    //   body,
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );

    if (!caseStudy) {
      return res
        .status(404)
        .json({ success: false, message: "Case study not found" });
    }

    res.status(200).json({ success: true, data: caseStudy });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ------------------------------------------------------------------ */
/* DELETE                                                               */
/* ------------------------------------------------------------------ */
exports.deleteCaseStudy = async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndDelete(req.params.id);
    if (!caseStudy) {
      return res
        .status(404)
        .json({ success: false, message: "Case study not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
