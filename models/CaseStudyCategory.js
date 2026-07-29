const mongoose = require("mongoose");

/**
 * CaseStudyCategory
 * -----------------------------------------------------------------
 * Single model backing BOTH "Browse By Industry" and
 * "Browse By Capability" sections. The `type` field decides which
 * bucket it shows up in.
 *
 * This matches the `parent` object shape used in sampleCaseStudies.js:
 *   parent: { name, slug, theme: { accent, accentDark, accentLight, accentSoft, accentRgb } }
 *
 * If you already have separate Industry / Platform models (e.g. from
 * the navbar mega menu), swap this out and just reference those
 * ObjectIds from CaseStudy instead — the controller below isolates
 * that lookup into a single `resolveParentCategory()` helper so it's
 * a one-place change.
 */
const themeSchema = new mongoose.Schema(
  {
    accent: { type: String, required: true },
    accentDark: { type: String, required: true },
    accentLight: { type: String, required: true },
    accentSoft: { type: String, required: true },
    accentRgb: { type: String, required: true },
  },
  { _id: false }
);

const caseStudyCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    type: {
      type: String,
      enum: ["industry", "capability"],
      required: true,
    },
    icon: { type: String }, // e.g. lucide icon name, matches navbar icons
    theme: { type: themeSchema, required: true },
    order: { type: Number, default: 0 }, // for controlling display order in "Browse By ..." lists
  },
  { timestamps: true }
);

// slug is unique per type (industry "healthcare" and capability "healthcare"
// could theoretically both exist without colliding)
caseStudyCategorySchema.index({ slug: 1, type: 1 }, { unique: true });

module.exports = mongoose.model("CaseStudyCategory", caseStudyCategorySchema);
