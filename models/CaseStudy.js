const mongoose = require("mongoose");
const seoSchema = require("../utils/seoSchema");

const buttonSchema = new mongoose.Schema(
  {
    label: String,
    link: String,
    variant: String,
  },
  { _id: false }
);

const breadcrumbSchema = new mongoose.Schema(
  {
    title: String,
    link: String,
  },
  { _id: false }
);

const statSchema = new mongoose.Schema(
  {
    value: String,
    label: String,
  },
  { _id: false }
);

const glanceSchema = new mongoose.Schema(
  {
    title: String,
    items: [String],
  },
  { _id: false }
);

const heroSectionSchema = new mongoose.Schema(
  {
    breadcrumb: [breadcrumbSchema],
    eyebrow: String,
    title: String,
    description: String,
    buttons: [buttonSchema],
    glance: glanceSchema,
    stats: [statSchema],
  },
  { _id: false }
);

const metricSchema = new mongoose.Schema(
  {
    value: String,
    label: String,
  },
  { _id: false }
);

const storySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["published", "reserved"],
      default: "published",
    },

    tags: [String],

    title: String,
    organization: String,
    country: String,

    challenge: String,
    solution: String,

    metrics: [metricSchema],

    outcomes: [String],

    products: [String],

    description: String,

    button: {
      label: String,
      link: String,
    },
  },
  { _id: false }
);

const successStorySchema = new mongoose.Schema(
  {
    eyebrow: String,
    title: String,
    description: String,

    stories: [storySchema],

    disclaimer: {
      title: String,
      description: String,
    },
  },
  { _id: false }
);

const capabilitySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    link: String,
  },
  { _id: false }
);

const relatedSchema = new mongoose.Schema(
  {
    eyebrow: String,
    title: String,
    items: [capabilitySchema],
  },
  { _id: false }
);

const ctaSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    buttons: [buttonSchema],
    note: String,
  },
  { _id: false }
);

const caseStudyPageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    sourceType: {
      type: String,
      enum: ["industry", "capability"],
      required: true,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CaseStudyCategory",
    },

    heroSection: heroSectionSchema,

    successStories: successStorySchema,

    relatedCapabilities: relatedSchema,

    ctaSection: ctaSchema,

    seo: { type: seoSchema, default: () => ({}) },

    heroImage: {
      url: String,
      publicId: String,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
  },
  {
    timestamps: true,
  }
);

caseStudyPageSchema.index({
  slug: 1,
});

caseStudyPageSchema.index({
  sourceType: 1,
});



module.exports = mongoose.model(
  "CaseStudyPage",
  caseStudyPageSchema
);