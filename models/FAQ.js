const mongoose = require("mongoose");

// Global FAQs (separate from per-page FAQs embedded in each model)
// These appear on /insights/faqs/ and can be filtered by topic

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },

    category: {
      type: String,
      enum: [
        "General",
        "Microsoft365",
        "Azure",
        "Dynamics365",
        "PowerPlatform",
        "SharePoint",
        "Security",
        "Pricing",
        "Process",
      ],
      default: "General",
    },

    // Link to relevant page for internal linking
    relatedService: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },

    relatedPlatform: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Platform",
    },

    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FAQ", faqSchema);
