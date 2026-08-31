const Service = require("../models/Service");
const Platform = require("../models/Platform");
const Solution = require("../models/Solution");
const Industry = require("../models/Industry");
const Resource = require("../models/Resource");
const CaseStudy = require("../models/CaseStudy");
const CaseStudyStory = require("../models/CaseStudyStory");
const BlogPost = require("../models/BlogPost");
const Guide = require("../models/Guide");
const Checklist = require("../models/Checklist");
const Whitepaper = require("../models/Whitepaper");
const HomePage = require("../models/HomePage");

// Every content type in the site shares the same dynamic SEO fields
// (metaTitle, metaDescription, keywords, canonicalUrl, ogImage) via
// utils/seoSchema.js. This map is how /api/seo/:pageType/:slug knows
// which collection to look in.
const modelMap = {
  service: Service,
  platform: Platform,
  solution: Solution,
  industry: Industry,
  resource: Resource,
  "case-study": CaseStudy,
  "case-study-story": CaseStudyStory,
  blog: BlogPost,
  guide: Guide,
  checklist: Checklist,
  whitepaper: Whitepaper,
};

// The home page is a singleton (no slug) so it's handled separately
// from the slug-keyed models above.
const HOME_PAGE_TYPE = "home";

// GET /api/seo/:pageType/:slug - Fetch SEO data for any page
// Frontend uses this for <Head> tags (React Helmet / Next.js Head)
// For the home page, call GET /api/seo/home/home (slug is ignored).
exports.getPageSEO = async (req, res) => {
  try {
    const { pageType, slug } = req.params;

    if (pageType === HOME_PAGE_TYPE) {
      let doc = await HomePage.findOne({ singletonKey: "home" }).select("seo");
      if (!doc) doc = await HomePage.create({ singletonKey: "home" });

      return res.json({
        success: true,
        data: {
          metaTitle: doc.seo?.metaTitle || "JJC Systems",
          metaDescription: doc.seo?.metaDescription || "",
          keywords: doc.seo?.keywords || [],
          canonicalUrl: doc.seo?.canonicalUrl || "",
          ogImage: doc.seo?.ogImage || "",
        },
      });
    }

    const Model = modelMap[pageType];
    if (!Model) {
      return res.status(400).json({ success: false, message: "Invalid page type" });
    }

    const doc = await Model.findOne({ slug }).select("seo title");
    if (!doc) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    res.json({
      success: true,
      data: {
        metaTitle: doc.seo?.metaTitle || `${doc.title} | JJC Systems`,
        metaDescription: doc.seo?.metaDescription || "",
        keywords: doc.seo?.keywords || [],
        canonicalUrl: doc.seo?.canonicalUrl || "",
        ogImage: doc.seo?.ogImage || "",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/seo/:pageType/:slug - Update SEO data
// Body accepts: { metaTitle, metaDescription, keywords, canonicalUrl, ogImage }
// `keywords` can be sent as an array, or as a comma-separated string
// (the admin panel field) — both are normalized to an array here.
exports.updatePageSEO = async (req, res) => {
  try {
    const { pageType, slug } = req.params;

    const seoPayload = { ...req.body };
    if (typeof seoPayload.keywords === "string") {
      seoPayload.keywords = seoPayload.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
    }

    if (pageType === HOME_PAGE_TYPE) {
      const doc = await HomePage.findOneAndUpdate(
        { singletonKey: "home" },
        { seo: seoPayload },
        { new: true, upsert: true, runValidators: true }
      );
      return res.json({ success: true, data: doc.seo });
    }

    const Model = modelMap[pageType];
    if (!Model) {
      return res.status(400).json({ success: false, message: "Invalid page type" });
    }

    const doc = await Model.findOneAndUpdate(
      { slug },
      { seo: seoPayload },
      { new: true, runValidators: true }
    );

    if (!doc) {
      return res.status(404).json({ success: false, message: "Page not found" });
    }

    res.json({ success: true, data: doc.seo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /api/seo/sitemap - Generate sitemap data for frontend
exports.getSitemapData = async (req, res) => {
  try {
    const [
      services,
      platforms,
      solutions,
      industries,
      resources,
      caseStudies,
      blogPosts,
      guides,
      checklists,
      whitepapers,
    ] = await Promise.all([
      Service.find({ isPublished: true }).select("slug updatedAt"),
      Platform.find({ isPublished: true }).select("slug updatedAt"),
      Solution.find({ isPublished: true }).select("slug updatedAt"),
      Industry.find({ isPublished: true }).select("slug updatedAt"),
      Resource.find({ isPublished: true }).select("slug updatedAt category topicCluster"),
      CaseStudy.find({ status: "published" }).select("slug updatedAt"),
      BlogPost.find({ isPublished: true }).select("slug updatedAt"),
      Guide.find({ isPublished: true }).select("slug updatedAt"),
      Checklist.find({ isPublished: true }).select("slug updatedAt"),
      Whitepaper.find({ isPublished: true }).select("slug updatedAt"),
    ]);

    res.json({
      success: true,
      data: {
        services,
        platforms,
        solutions,
        industries,
        resources,
        caseStudies,
        blogPosts,
        guides,
        checklists,
        whitepapers,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
