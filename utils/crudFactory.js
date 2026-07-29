// Generic CRUD factory - reduces boilerplate across all controllers
// Each controller uses these helpers and adds custom logic as needed

exports.getAll = (Model, populateOptions = []) =>
  async (req, res) => {
    try {
      const { page = 1, limit = 20, search, isPublished } = req.query;
      const skip = (page - 1) * limit;

      let query = {};

      // Public routes only return published content
      if (isPublished !== undefined) {
        query.isPublished = isPublished === "true";
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: "i" } },
          { shortDescription: { $regex: search, $options: "i" } },
        ];
      }

      let dbQuery = Model.find(query).sort({ order: 1, createdAt: -1 }).skip(skip).limit(Number(limit));

      populateOptions.forEach((opt) => {
        dbQuery = dbQuery.populate(opt);
      });

      const [data, total] = await Promise.all([
        dbQuery,
        Model.countDocuments(query),
      ]);

      res.json({
        success: true,
        count: data.length,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        data,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

exports.getOne = (Model, populateOptions = []) =>
  async (req, res) => {
    try {
      let query = Model.findOne({
        $or: [{ slug: req.params.slug }, { _id: req.params.slug }],
      });

      populateOptions.forEach((opt) => {
        query = query.populate(opt);
      });

      const doc = await query;

      if (!doc) {
        return res.status(404).json({ success: false, message: "Not found" });
      }

      res.json({ success: true, data: doc });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

exports.create = (Model) =>
  async (req, res) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json({ success: true, data: doc });
    } catch (err) {
      if (err.code === 11000) {
        return res
          .status(400)
          .json({ success: false, message: "Duplicate entry - already exists" });
      }
      res.status(400).json({ success: false, message: err.message });
    }
  };

exports.update = (Model) =>
  async (req, res) => {
    try {
      const doc = await Model.findOneAndUpdate(
        { $or: [{ slug: req.params.slug }, { _id: req.params.slug }] },
        req.body,
        { new: true, runValidators: true }
      );

      if (!doc) {
        return res.status(404).json({ success: false, message: "Not found" });
      }

      res.json({ success: true, data: doc });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

exports.remove = (Model) =>
  async (req, res) => {
    try {
      const doc = await Model.findOneAndDelete({
        $or: [{ slug: req.params.slug }, { _id: req.params.slug }],
      });

      if (!doc) {
        return res.status(404).json({ success: false, message: "Not found" });
      }

      res.json({ success: true, message: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

exports.togglePublish = (Model) =>
  async (req, res) => {
    try {
      const doc = await Model.findOne({
        $or: [{ slug: req.params.slug }, { _id: req.params.slug }],
      });

      if (!doc) {
        return res.status(404).json({ success: false, message: "Not found" });
      }

      doc.isPublished = !doc.isPublished;
      await doc.save();

      res.json({
        success: true,
        message: `${doc.isPublished ? "Published" : "Unpublished"} successfully`,
        data: { isPublished: doc.isPublished },
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
