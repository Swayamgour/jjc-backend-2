const Service = require("../models/Service");
const Platform = require("../models/Platform");
const Solution = require("../models/Solution");
const Industry = require("../models/Industry");
const Resource = require("../models/Resource");
const CaseStudy = require("../models/CaseStudy");

// GET /api/seo/:pageType/:slug - Fetch SEO data for any page
// Frontend uses this for <Head> tags (React Helmet / Next.js Head)
exports.getPageSEO = async (req, res) => {
  try {
    const { pageType, slug } = req.params;

    const modelMap = {
      service: Service,
      platform: Platform,
      solution: Solution,
      industry: Industry,
      resource: Resource,
      "case-study": CaseStudy,
    };

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
        ...doc.seo,
        // Fallback if SEO fields not filled
        metaTitle: doc.seo?.metaTitle || `${doc.title} | JJC Systems`,
        metaDescription: doc.seo?.metaDescription || "",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT /api/seo/:pageType/:slug - Update SEO data
exports.updatePageSEO = async (req, res) => {
  try {
    const { pageType, slug } = req.params;

    const modelMap = {
      service: Service,
      platform: Platform,
      solution: Solution,
      industry: Industry,
      resource: Resource,
      "case-study": CaseStudy,
    };

    const Model = modelMap[pageType];
    if (!Model) {
      return res.status(400).json({ success: false, message: "Invalid page type" });
    }

    const doc = await Model.findOneAndUpdate(
      { slug },
      { seo: req.body },
      { new: true }
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
    const [services, platforms, solutions, industries, resources, caseStudies] =
      await Promise.all([
        Service.find({ isPublished: true }).select("slug updatedAt"),
        Platform.find({ isPublished: true }).select("slug updatedAt"),
        Solution.find({ isPublished: true }).select("slug updatedAt"),
        Industry.find({ isPublished: true }).select("slug updatedAt"),
        Resource.find({ isPublished: true }).select("slug updatedAt category topicCluster"),
        CaseStudy.find({ isPublished: true }).select("slug updatedAt"),
      ]);

    res.json({
      success: true,
      data: { services, platforms, solutions, industries, resources, caseStudies },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
