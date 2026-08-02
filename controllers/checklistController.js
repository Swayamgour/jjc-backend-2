const asyncHandler = require("express-async-handler");
const Checklist = require("../models/Checklist.js");
const { PLATFORM_LABELS, SERVICE_LABELS, INDUSTRY_LABELS } = require("../utils/checklistLabels.js");

const shapeChecklist = (doc) => {
  const cl = doc.toObject();
  const platformLabel = PLATFORM_LABELS[cl.platform] || cl.platform;
  const industryLabel = INDUSTRY_LABELS[cl.industry] || cl.industry;
  const serviceLabel = SERVICE_LABELS[cl.service] || cl.service;
  const totalChecks = (cl.sections || []).reduce((sum, s) => sum + (s.items?.length || 0), 0);

  return {
    ...cl,
    platformLabel,
    serviceLabel,
    industryLabel,
    totalChecks,
    hero: {
      eyebrow: cl.eyebrow?.trim() || `${platformLabel} · ${cl.badge}`,
      title: cl.title,
      lede: cl.description,
      ctaPrimary: cl.ctaPrimary,
      ctaSecondary: cl.ctaSecondary,
      beforeYouStart: cl.beforeYouStart,
    },
    stats: {
      totalChecks,
      difficulty: cl.difficulty,
      typicalEffort: cl.typicalEffort,
      writtenFor: cl.writtenFor?.trim() || industryLabel,
    },
  };
};

// @route GET /api/checklists
const getChecklists = asyncHandler(async (req, res) => {
  const { platform, service, industry, badge, search, page = 1, limit = 12, all } = req.query;

  const query = {};
  if (!all) query.isPublished = true;
  if (platform) query.platform = platform;
  if (service) query.service = service;
  if (industry) query.industry = industry;
  if (badge) query.badge = badge;
  if (search) query.$text = { $search: search };

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.max(1, parseInt(limit, 10));

  const [checklists, total] = await Promise.all([
    Checklist.find(query)
      .select("title slug description platform service industry badge icon difficulty publishedAt sections")
      .sort({ publishedAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Checklist.countDocuments(query),
  ]);

  // list cards need only the check *count*, not full item text — trim it down
  const cards = checklists.map((c) => {
    const obj = c.toObject();
    const totalChecks = (obj.sections || []).reduce((sum, s) => sum + (s.items?.length || 0), 0);
    delete obj.sections;
    return {
      ...obj,
      totalChecks,
      platformLabel: PLATFORM_LABELS[obj.platform] || obj.platform,
      industryLabel: INDUSTRY_LABELS[obj.industry] || obj.industry,
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

// @route GET /api/checklists/filters
const getFilterOptions = asyncHandler(async (req, res) => {
  const [platforms, services, industries, badges] = await Promise.all([
    Checklist.distinct("platform", { isPublished: true }),
    Checklist.distinct("service", { isPublished: true }),
    Checklist.distinct("industry", { isPublished: true }),
    Checklist.distinct("badge", { isPublished: true }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      platforms: platforms.map((p) => ({ value: p, label: PLATFORM_LABELS[p] || p })),
      services: services.map((s) => ({ value: s, label: SERVICE_LABELS[s] || s })),
      industries: industries.map((i) => ({ value: i, label: INDUSTRY_LABELS[i] || i })),
      badges,
    },
  });
});

// @route GET /api/checklists/stats  (for the top hero: "36 checklists / 720 checks / 9 platforms / 11 industries")
const getLibraryStats = asyncHandler(async (req, res) => {
  const checklists = await Checklist.find({ isPublished: true }).select("sections platform industry");
  const totalChecklists = checklists.length;
  const totalChecks = checklists.reduce(
    (sum, c) => sum + (c.sections || []).reduce((s2, sec) => s2 + (sec.items?.length || 0), 0),
    0
  );
  const platformCount = new Set(checklists.map((c) => c.platform)).size;
  const industryCount = new Set(checklists.map((c) => c.industry)).size;

  res.status(200).json({
    success: true,
    data: { totalChecklists, totalChecks, platformCount, industryCount },
  });
});

// @route GET /api/checklists/:slug
const getChecklistBySlug = asyncHandler(async (req, res) => {
  const checklist = await Checklist.findOne({ slug: req.params.slug, isPublished: true }).populate(
    "relatedChecklists.checklist",
    "title slug description platform industry badge icon publishedAt sections"
  );

  if (!checklist) {
    res.status(404);
    throw new Error("Checklist not found");
  }

  let related;
  if (checklist.relatedChecklists?.length) {
    related = checklist.relatedChecklists.map((r) => ({
      title: r.titleOverride || r.checklist?.title,
      description: r.descriptionOverride || r.checklist?.description,
      link: r.linkOverride || `/checklists/${r.checklist?.slug}`,
      platform: r.checklist?.platform,
      industry: r.checklist?.industry,
      icon: r.checklist?.icon,
      totalChecks: (r.checklist?.sections || []).reduce((s, sec) => s + (sec.items?.length || 0), 0),
      publishedAt: r.checklist?.publishedAt,
    }));
  } else {
    const relatedDocs = await Checklist.find({
      industry: checklist.industry,
      slug: { $ne: checklist.slug },
      isPublished: true,
    })
      .select("title slug description platform industry icon publishedAt sections")
      .sort({ publishedAt: -1 })
      .limit(3);
    related = relatedDocs.map((r) => ({
      ...r.toObject(),
      link: `/checklists/${r.slug}`,
      totalChecks: (r.sections || []).reduce((s, sec) => s + (sec.items?.length || 0), 0),
    }));
  }

  res.status(200).json({ success: true, data: shapeChecklist(checklist), related });
});

// @route GET /api/checklists/id/:id  (admin edit form)
const getChecklistById = asyncHandler(async (req, res) => {
  const checklist = await Checklist.findById(req.params.id);
  if (!checklist) {
    res.status(404);
    throw new Error("Checklist not found");
  }
  res.status(200).json({ success: true, data: checklist });
});

// @route POST /api/checklists
const createChecklist = asyncHandler(async (req, res) => {
  const checklist = await Checklist.create(req.body);
  res.status(201).json({ success: true, data: checklist });
});

// @route PUT /api/checklists/:id
const updateChecklist = asyncHandler(async (req, res) => {
  const checklist = await Checklist.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!checklist) {
    res.status(404);
    throw new Error("Checklist not found");
  }
  res.status(200).json({ success: true, data: checklist });
});

// @route DELETE /api/checklists/:id
const deleteChecklist = asyncHandler(async (req, res) => {
  const checklist = await Checklist.findByIdAndDelete(req.params.id);
  if (!checklist) {
    res.status(404);
    throw new Error("Checklist not found");
  }
  res.status(200).json({ success: true, message: "Checklist deleted" });
});

module.exports = {
  getChecklists,
  getFilterOptions,
  getLibraryStats,
  getChecklistBySlug,
  getChecklistById,
  createChecklist,
  updateChecklist,
  deleteChecklist,
};