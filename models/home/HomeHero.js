const mongoose = require("mongoose");

/* -------------------------------- */
/* Common Schemas                   */
/* -------------------------------- */

const imageSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
  },
  { _id: false }
);

const partnerSchema = new mongoose.Schema(
  {
    icon: String, // e.g. "M365", "Azure", "Dynamics" -> mapped to an icon on frontend
    title: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: false }
);

const floatingCardSchema = new mongoose.Schema(
  {
    icon: String,
    title: String,
    subtitle: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: false }
);

/* -------------------------------- */
/* Home Hero Schema (singleton)     */
/* -------------------------------- */

const homeHeroSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
      default: "SMART SOLUTIONS. REAL IMPACT.",
    },

    title: {
      type: String,
      default: "Microsoft Consulting Services for Modern Business Operations",
    },

    // The word/phrase inside <span className="highlight">
    highlightedText: {
      type: String,
      default: "Modern",
    },

    description: {
      type: String,
      default: "",
    },

    primaryButtonText: {
      type: String,
      default: "Schedule a Microsoft Consultation",
    },

    primaryButtonLink: {
      type: String,
      default: "/contact",
    },

    secondaryButtonText: {
      type: String,
      default: "Explore Microsoft Services",
    },

    secondaryButtonLink: {
      type: String,
      default: "/services",
    },

    image: imageSchema,

    partners: [partnerSchema],

    floatingCards: [floatingCardSchema],

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeHero", homeHeroSchema);
