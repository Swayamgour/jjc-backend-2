const mongoose = require("mongoose");

/* ---------- reusable sub-schemas (all _id: false, pure data blocks) ---------- */

const iconStatSchema = new mongoose.Schema(
  { icon: String, value: String, label: String },
  { _id: false }
);

const clientInfoItemSchema = new mongoose.Schema(
  { icon: String, label: String, value: String },
  { _id: false }
);

const highlightSchema = new mongoose.Schema(
  { icon: String, title: String, desc: String },
  { _id: false }
);

const overviewSchema = new mongoose.Schema(
  {
    tag: String,
    heading: String,
    intro: String,
    highlights: [highlightSchema],
  },
  { _id: false }
);

const listBlockSchema = new mongoose.Schema(
  {
    heading: String,
    intro: String,
    items: [String],
  },
  { _id: false }
);

const approachStepSchema = new mongoose.Schema(
  {
    number: String,
    icon: String,
    title: String,
    desc: String,
  },
  { _id: false }
);

const approachSchema = new mongoose.Schema(
  {
    heading: String,
    steps: [approachStepSchema],
  },
  { _id: false }
);

const resultsSchema = new mongoose.Schema(
  {
    heading: String,
    stats: [iconStatSchema],
    closing: String,
  },
  { _id: false }
);

const technologiesSchema = new mongoose.Schema(
  {
    heading: String,
    items: [String],
  },
  { _id: false }
);

const beforeAfterSchema = new mongoose.Schema(
  {
    before: [String],
    after: [String],
  },
  { _id: false }
);

const testimonialSchema = new mongoose.Schema(
  {
    quote: String,
    author: String,
    role: String,
    image: {
      url: String,
      publicId: String,
    },
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  { question: String, answer: String },
  { _id: false }
);

const resourcesSchema = new mongoose.Schema(
  {
    heading: String,
    description: String,
    downloadLabel: String,
    downloadLink: String,
    secondaryLabel: String,
    secondaryLink: String,
  },
  { _id: false }
);

// Manual override for "More Stories" — optional. Recommended: compute this
// dynamically at read-time (e.g. latest N case studies excluding self) instead
// of storing it, so it never goes stale. Kept here only if you want manual pinning.
const moreStorySchema = new mongoose.Schema(
  {
    category: String,
    title: String,
    sourceType: { type: String, enum: ["industry", "capability"] },
    slug: String,
    image: String,
  },
  { _id: false }
);

/* ---------------------------- main schema ---------------------------- */

const caseStudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },

    sourceType: {
      type: String,
      enum: ["industry", "capability"],
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CaseStudyCategory",
      required: true,
    },

    heroImage: {
      url: String,
      publicId: String,
    },
    techBadges: [String],
    heroStats: [iconStatSchema],

    ctaLabel: String,
    ctaLink: String,

    clientInfo: [clientInfoItemSchema],

    overview: overviewSchema,
    challenge: listBlockSchema,
    solution: listBlockSchema,
    approach: approachSchema,
    results: resultsSchema,
    technologies: technologiesSchema,
    beforeAfter: beforeAfterSchema,
    testimonial: testimonialSchema,

    gallery: [
      {
        url: String,
        publicId: String,
      },
    ],

    faqs: [faqSchema],
    resources: resourcesSchema,

    moreStories: [moreStorySchema], // optional manual override, see note above

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  { timestamps: true }
);

caseStudySchema.index({ sourceType: 1, parent: 1 });

module.exports = mongoose.model("CaseStudy", caseStudySchema);
