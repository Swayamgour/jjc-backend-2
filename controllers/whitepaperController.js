const asyncHandler = require("express-async-handler");
const Whitepaper = require("../models/Whitepaper.js");
const { PLATFORM_LABELS, SERVICE_LABELS, INDUSTRY_LABELS } = require("../utils/whitepaperLabels.js");

const shapeWhitepaper = (doc) => {
  const wp = doc.toObject();
  const platformLabel = PLATFORM_LABELS[wp.platform] || wp.platform;
  const industryLabel = INDUSTRY_LABELS[wp.industry] || wp.industry;
  const serviceLabel = SERVICE_LABELS[wp.service] || wp.service;

  return {
    ...wp,
    platformLabel,
    serviceLabel,
    industryLabel,
    hero: {
      eyebrow: wp.eyebrow?.trim() || `${platformLabel} · ${industryLabel}`,
      title: wp.title,
      lede: wp.subtitle || wp.description,
      ctaPrimary: wp.ctaPrimary,
      ctaSecondary: wp.ctaSecondary,
      inThisPaper: wp.inThisPaper,
    },
    docMeta: {
      published: wp.publishedAt,
      length: `${wp.pages} pages · ${wp.readTime}`,
      sector: industryLabel,
      platform: platformLabel,
      serviceArea: serviceLabel,
    },
  };
};

// @route GET /api/whitepapers
const getWhitepapers = asyncHandler(async (req, res) => {
  const { platform, service, industry, search, page = 1, limit = 12, all } = req.query;

  const query = {};
  if (!all) query.isPublished = true;
  if (platform) query.platform = platform;
  if (service) query.service = service;
  if (industry) query.industry = industry;
  if (search) query.$text = { $search: search };

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.max(1, parseInt(limit, 10));

  const [whitepapers, total] = await Promise.all([
    Whitepaper.find(query)
      .select("title slug description platform service industry icon pages readTime publishedAt")
      .sort({ publishedAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Whitepaper.countDocuments(query),
  ]);

  const cards = whitepapers.map((w) => {
    const obj = w.toObject();
    return {
      ...obj,
      platformLabel: PLATFORM_LABELS[obj.platform] || obj.platform,
      industryLabel: INDUSTRY_LABELS[obj.industry] || obj.industry,
      badge: `${obj.pages} pages`,
    };
  });

  res.status(200).json({
    success: true,
    data: cards,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasMore: pageNum * limitNum < total,
    },
  });
});

// @route GET /api/whitepapers/filters
const getFilterOptions = asyncHandler(async (req, res) => {
  const [platforms, services, industries] = await Promise.all([
    Whitepaper.distinct("platform", { isPublished: true }),
    Whitepaper.distinct("service", { isPublished: true }),
    Whitepaper.distinct("industry", { isPublished: true }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      platforms: platforms.map((p) => ({ value: p, label: PLATFORM_LABELS[p] || p })),
      services: services.map((s) => ({ value: s, label: SERVICE_LABELS[s] || s })),
      industries: industries.map((i) => ({ value: i, label: INDUSTRY_LABELS[i] || i })),
    },
  });
});

// @route GET /api/whitepapers/stats  (for hero: "36 papers / 180 references / 9 platforms / 11 industries")
const getLibraryStats = asyncHandler(async (req, res) => {
  const whitepapers = await Whitepaper.find({ isPublished: true }).select("references platform industry");
  const totalPapers = whitepapers.length;
  const totalReferences = whitepapers.reduce((sum, w) => sum + (w.references?.length || 0), 0);
  const platformCount = new Set(whitepapers.map((w) => w.platform)).size;
  const industryCount = new Set(whitepapers.map((w) => w.industry)).size;

  res.status(200).json({
    success: true,
    data: { totalPapers, totalReferences, platformCount, industryCount },
  });
});

// @route GET /api/whitepapers/:slug
const getWhitepaperBySlug = asyncHandler(async (req, res) => {
  const whitepaper = await Whitepaper.findOne({ slug: req.params.slug, isPublished: true }).populate(
    "relatedWhitepapers.whitepaper",
    "title slug description platform industry icon pages readTime publishedAt"
  );

  if (!whitepaper) {
    res.status(404);
    throw new Error("Whitepaper not found");
  }

  let related;
  if (whitepaper.relatedWhitepapers?.length) {
    related = whitepaper.relatedWhitepapers.map((r) => ({
      title: r.titleOverride || r.whitepaper?.title,
      description: r.descriptionOverride || r.whitepaper?.description,
      link: r.linkOverride || `/whitepapers/${r.whitepaper?.slug}`,
      platform: r.whitepaper?.platform,
      industry: r.whitepaper?.industry,
      icon: r.whitepaper?.icon,
      pages: r.whitepaper?.pages,
      readTime: r.whitepaper?.readTime,
      publishedAt: r.whitepaper?.publishedAt,
    }));
  } else {
    related = await Whitepaper.find({
      industry: whitepaper.industry,
      slug: { $ne: whitepaper.slug },
      isPublished: true,
    })
      .select("title slug description platform industry icon pages readTime publishedAt")
      .sort({ publishedAt: -1 })
      .limit(3);
  }

  res.status(200).json({ success: true, data: shapeWhitepaper(whitepaper), related });
});

// @route GET /api/whitepapers/id/:id  (admin edit form)
const getWhitepaperById = asyncHandler(async (req, res) => {
  const whitepaper = await Whitepaper.findById(req.params.id);
  if (!whitepaper) {
    res.status(404);
    throw new Error("Whitepaper not found");
  }
  res.status(200).json({ success: true, data: whitepaper });
});

// @route POST /api/whitepapers
const createWhitepaper = asyncHandler(async (req, res) => {
  const whitepaper = await Whitepaper.create(req.body);
  res.status(201).json({ success: true, data: whitepaper });
});

// @route PUT /api/whitepapers/:id
const updateWhitepaper = asyncHandler(async (req, res) => {
  const whitepaper = await Whitepaper.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!whitepaper) {
    res.status(404);
    throw new Error("Whitepaper not found");
  }
  res.status(200).json({ success: true, data: whitepaper });
});

// @route DELETE /api/whitepapers/:id
const deleteWhitepaper = asyncHandler(async (req, res) => {
  const whitepaper = await Whitepaper.findByIdAndDelete(req.params.id);
  if (!whitepaper) {
    res.status(404);
    throw new Error("Whitepaper not found");
  }
  res.status(200).json({ success: true, message: "Whitepaper deleted" });
});

module.exports = {
  getWhitepapers,
  getFilterOptions,
  getLibraryStats,
  getWhitepaperBySlug,
  getWhitepaperById,
  createWhitepaper,
  updateWhitepaper,
  deleteWhitepaper,
};