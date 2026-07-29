const Service = require("../models/Service");
const Platform = require("../models/Platform");
const Solution = require("../models/Solution");
const Industry = require("../models/Industry");

// GET /api/nav/mega-menu
// Returns everything the frontend mega menu needs in ONE request
// Frontend caches this - no need to hit 4 endpoints
exports.getMegaMenu = async (req, res) => {
  try {
    const [services, platforms, solutions, industries] = await Promise.all([
      Service.find({ isPublished: true })
        .select("title slug shortDescription")
        .sort({ order: 1 }),

      Platform.find({ isPublished: true })
        .select("title slug category shortDescription")
        .sort({ category: 1, order: 1 }),

      Solution.find({ isPublished: true })
        .select("title slug shortDescription")
        .sort({ order: 1 }),

      Industry.find({ isPublished: true })
        .select("title slug")
        .sort({ order: 1 }),
    ]);

    // Group platforms by category for mega menu columns
    const platformsByCategory = platforms.reduce((acc, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push({ title: p.title, slug: p.slug, description: p.shortDescription });
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        services,
        platforms: platformsByCategory,
        solutions,
        industries,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
