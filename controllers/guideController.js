const asyncHandler = require("express-async-handler");
const Guide = require("../models/Guide.js");
const { PLATFORM_LABELS, SERVICE_LABELS, INDUSTRY_LABELS } = require("../utils/guideLabels.js");

const shapeGuide = (guideDoc) => {
  const guide = guideDoc.toObject();

  const platformLabel = PLATFORM_LABELS[guide.platform] || guide.platform;
  const industryLabel = INDUSTRY_LABELS[guide.industry] || guide.industry;
  const serviceLabel = SERVICE_LABELS[guide.service] || guide.service;

  return {
    ...guide,
    platformLabel,
    serviceLabel,
    industryLabel,
    hero: {
      eyebrow: guide.eyebrow?.trim() || `${platformLabel} · ${guide.level}`,
      title: guide.title,
      lede: guide.description,
      ctaPrimary: guide.ctaPrimary,
      ctaSecondary: guide.ctaSecondary,
      keyPractices: guide.keyPractices,
    },
    stats: {
      difficulty: guide.level,
      readTime: guide.readTime,
      typicalEffort: guide.typicalEffort,
      writtenFor: guide.writtenFor?.trim() || industryLabel,
    },
  };
};

// @route GET /api/guides
const getGuides = asyncHandler(async (req, res) => {
  const { platform, service, industry, level, search, page = 1, limit = 20, all } = req.query;

  const query = {};
  if (!all) query.isPublished = true;
  if (platform) query.platform = platform;
  if (service) query.service = service;
  if (industry) query.industry = industry;
  if (level) query.level = level;
  if (search) query.$text = { $search: search };

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.max(1, parseInt(limit, 10));

  const [guides, total] = await Promise.all([
    Guide.find(query)
      .select("title slug description platform service industry level icon readTime publishedAt")
      .sort({ publishedAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Guide.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    data: guides,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasMore: pageNum * limitNum < total,
    },
  });
});

// @route GET /api/guides/filters
const getFilterOptions = asyncHandler(async (req, res) => {
  const [platforms, services, industries, levels] = await Promise.all([
    Guide.distinct("platform", { isPublished: true }),
    Guide.distinct("service", { isPublished: true }),
    Guide.distinct("industry", { isPublished: true }),
    Guide.distinct("level", { isPublished: true }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      platforms: platforms.map((p) => ({ value: p, label: PLATFORM_LABELS[p] || p })),
      services: services.map((s) => ({ value: s, label: SERVICE_LABELS[s] || s })),
      industries: industries.map((i) => ({ value: i, label: INDUSTRY_LABELS[i] || i })),
      levels,
    },
  });
});

// @route GET /api/guides/:slug
const getGuideBySlug = asyncHandler(async (req, res) => {
  const guide = await Guide.findOne({ slug: req.params.slug, isPublished: true }).populate(
    "relatedGuides.guide",
    "title slug description platform industry level icon readTime publishedAt"
  );

  if (!guide) {
    res.status(404);
    throw new Error("Guide not found");
  }

  let related;
  if (guide.relatedGuides?.length) {
    related = guide.relatedGuides.map((r) => ({
      title: r.titleOverride || r.guide?.title,
      description: r.descriptionOverride || r.guide?.description,
      link: r.linkOverride || `/guides/${r.guide?.slug}`,
      platform: r.guide?.platform,
      industry: r.guide?.industry,
      level: r.guide?.level,
      icon: r.guide?.icon,
      readTime: r.guide?.readTime,
      publishedAt: r.guide?.publishedAt,
    }));
  } else {
    related = await Guide.find({
      industry: guide.industry,
      slug: { $ne: guide.slug },
      isPublished: true,
    })
      .select("title slug description platform industry level icon readTime publishedAt")
      .sort({ publishedAt: -1 })
      .limit(3);
  }

  res.status(200).json({ success: true, data: shapeGuide(guide), related });
});

// @route GET /api/guides/id/:id  (admin edit form)
const getGuideById = asyncHandler(async (req, res) => {
  const guide = await Guide.findById(req.params.id);
  if (!guide) {
    res.status(404);
    throw new Error("Guide not found");
  }
  res.status(200).json({ success: true, data: guide });
});

// @route POST /api/guides
const createGuide = asyncHandler(async (req, res) => {
  const guide = await Guide.create(req.body);
  res.status(201).json({ success: true, data: guide });
});

// @route PUT /api/guides/:id
const updateGuide = asyncHandler(async (req, res) => {
  const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!guide) {
    res.status(404);
    throw new Error("Guide not found");
  }
  res.status(200).json({ success: true, data: guide });
});

// @route DELETE /api/guides/:id
const deleteGuide = asyncHandler(async (req, res) => {
  const guide = await Guide.findByIdAndDelete(req.params.id);
  if (!guide) {
    res.status(404);
    throw new Error("Guide not found");
  }
  res.status(200).json({ success: true, message: "Guide deleted" });
});

module.exports = {
  getGuides,
  getFilterOptions,
  getGuideBySlug,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide,
};