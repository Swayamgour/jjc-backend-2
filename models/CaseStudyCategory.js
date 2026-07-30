const mongoose = require("mongoose");

/**
 * CaseStudyCategory
 * -----------------------------------------------------------------
 * Backs BOTH "Browse By Industry" (/success/industry-healthcare) and
 * "Browse By Capability" (/success/capability-business-applications)
 * listing pages. `type` decides which bucket it belongs to.
 *
 * This model also stores the page-level hero/glance content shown at
 * the top of the industry/capability listing page (SuccessIndustryHealthcare.jsx),
 * so the whole page — not just the case study cards — is CMS-driven.
 */

const themeSchema = new mongoose.Schema(
  {
    accent: String,
    accentDark: String,
    accentLight: String,
    accentSoft: String,
    accentRgb: String,
  },
  { _id: false }
);

const glanceItemSchema = new mongoose.Schema(
  {
    icon: { type: String, default: "i-check" }, // svg sprite id, e.g. "i-check"
    text: String,
  },
  { _id: false }
);

const caseStudyCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // "Healthcare"
    slug: { type: String, required: true, lowercase: true, trim: true }, // "healthcare"
    type: {
      type: String,
      enum: ["industry", "capability"],
      required: true,
    },
    icon: { type: String }, // lucide icon name, matches navbar icons
    theme: { type: themeSchema },
    order: { type: Number, default: 0 }, // display order in "Browse By ..." lists

    // ---- Listing page hero (top of SuccessIndustryHealthcare-style page) ----
    heroEyebrow: { type: String, default: "Client Success · Industry" },
    heroHeading: String, // "What good looks like in Healthcare"
    heroLede: String,

    // ---- "Where these come from" aside box ----
    glanceHeading: { type: String, default: "Where these come from" },
    glanceItems: [glanceItemSchema],

    // ---- svc-stats strip under the hero (extra stats beyond the auto-computed count) ----
    extraStats: [
      {
        value: String,
        label: String,
        _id: false,
      },
    ],

    // ---- "Success stories" section head ----
    listHeading: String, // "Four outcomes in Healthcare"
    listLede: String,

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

// slug is unique per type (industry "healthcare" and capability "healthcare"
// could theoretically both exist without colliding)
caseStudyCategorySchema.index({ slug: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("CaseStudyCategory", caseStudyCategorySchema);
