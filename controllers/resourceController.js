const Resource = require("../models/Resource");
const crud = require("../utils/crudFactory");

exports.getAllResources = async (req, res) => {
  try {
    const { category, topicCluster, page = 1, limit = 12, search } = req.query;
    const query = req.user ? {} : { isPublished: true };

    if (category) query.category = category;
    if (topicCluster) query.topicCluster = topicCluster;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (page - 1) * limit;
    const [resources, total] = await Promise.all([
      Resource.find(query)
        .sort({ isFeatured: -1, publishedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("-content"), // exclude heavy content in list view
      Resource.countDocuments(query),
    ]);

    res.json({
      success: true,
      count: resources.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: resources,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getResource = crud.getOne(Resource, [
  { path: "relatedServices", select: "title slug" },
  { path: "relatedPlatforms", select: "title slug" },
]);
exports.createResource = crud.create(Resource);
exports.updateResource = crud.update(Resource);
exports.deleteResource = crud.remove(Resource);
exports.togglePublish = crud.togglePublish(Resource);

// GET featured resources for homepage
exports.getFeaturedResources = async (req, res) => {
  try {
    const resources = await Resource.find({ isPublished: true, isFeatured: true })
      .sort({ publishedAt: -1 })
      .limit(3)
      .select("title slug category thumbnail excerpt publishedAt readTime");
    res.json({ success: true, data: resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
