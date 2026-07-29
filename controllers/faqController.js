const FAQ = require("../models/FAQ");
const crud = require("../utils/crudFactory");

exports.getAllFAQs = async (req, res) => {
  try {
    const query = { isPublished: true };
    const { category } = req.query;
    if (category) query.category = category;

    const faqs = await FAQ.find(query)
      .sort({ isFeatured: -1, order: 1 })
      .populate("relatedService", "title slug")
      .populate("relatedPlatform", "title slug");

    res.json({ success: true, count: faqs.length, data: faqs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createFAQ = crud.create(FAQ);

exports.updateFAQ = async (req, res) => {
  try {
    const doc = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
