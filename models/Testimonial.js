const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: String,
    company: String,
    companyLogo: String,
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },

    // Which service/platform this relates to
    relatedService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },

    industry: String,
    isFeatured: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
