const Testimonial = require("../models/Testimonial");
const crud = require("../utils/crudFactory");

exports.getAllTestimonials = async (req, res) => {
  try {
    const query = req.user ? {} : { isApproved: true };
    const testimonials = await Testimonial.find(query)
      .sort({ isFeatured: -1, order: 1 })
      .populate("relatedService", "title slug");
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createTestimonial = crud.create(Testimonial);

exports.updateTestimonial = async (req, res) => {
  try {
    const doc = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const doc = await Testimonial.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
