

const mongoose = require("mongoose");
const seoSchema = require("../utils/seoSchema");
const slugify = require("slugify");

/* -------------------------------- */
/* Common Schemas */
/* -------------------------------- */

const imageSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
  },
  { _id: false }
);

const iconCardSchema = new mongoose.Schema(
  {
    icon: String,
    title: String,
    subtitle: String,
    description: String,
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const processStepSchema = new mongoose.Schema(
  {
    step: Number,
    title: String,
    description: String,
    icon: String,
  },
  { _id: false }
);

const caseStudySchema = new mongoose.Schema(
  {
    tag: String,
    title: String,
    description: String,
    stat: String,
    statLabel: String,
    color: String,
  },
  { _id: false }
);

const industrySchema = new mongoose.Schema(
  {
    icon: String,
    title: String,
    description: String,
  },
  { _id: false }
);

/* -------------------------------- */
/* Platform Schema */
/* -------------------------------- */

const platformSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    
    urlPath: {
      type: String,
      unique: true,
    },

    shortDescription: {
      type: String,
      required: true,
      // maxlength: 300,
    },

    badge: String,

    breadcrumb: [String],

    /* ---------------- Hero ---------------- */

    hero: {
      heading: {
        type: String,
        required: true,
      },

      highlightedHeading: String,

      description: String,

      subDescription: String,

      badges: [String],

      image: imageSchema,
    },

    /* ---------------- Overview ---------------- */

    overview: {
      tag: String,

      title: String,

      brandLabel: String,

      image: imageSchema,

      paragraphs: [String],

      checklist: [String],
    },

    /* ---------------- Key Capabilities ---------------- */

    capabilities: {
      tag: String,

      title: String,

      subtitle: String,

      items: [iconCardSchema],
    },

    /* ---------------- Business Benefits ---------------- */

    benefits: {
      tag: String,

      title: String,

      description: String,

      buttonLabel: String,

      items: [
        {
          _id: false,
          icon:String,
          title: String,
          description: String,
        },
      ],
    },

    /* ---------------- Implementation Process ---------------- */

    implementationProcess: {
      tag: String,

      title: String,

      subtitle: String,

      steps: [processStepSchema],
    },

    /* ---------------- Industries ---------------- */

    industries: {
      tag: String,

      title: String,

      subtitle: String,

      items: [industrySchema],

      footerLink: String,
    },

    /* ---------------- Case Studies ---------------- */

    caseStudies: {
      tag: String,

      title: String,

      subtitle: String,

      items: [caseStudySchema],
    },

    /* ---------------- FAQs ---------------- */

    faqs: {
      tag: String,

      title: String,

      items: [faqSchema],
    },

    /* ---------------- CTA ---------------- */

    cta: {
      title: String,

      description: String,

      primaryLabel: String,

      secondaryLabel: String,
    },

    /* ---------------- Theme ---------------- */

    theme: {
      accent: String,
      accentDark: String,
      accentLight: String,
      accentSoft: String,
      heroStart: String,
      heroEnd: String,
      accentRgb: String,
    },

    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: true,
    // },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    seo: { type: seoSchema, default: () => ({}) },

    isPublished: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

/* -------------------------------- */
/* Indexes */
/* -------------------------------- */

platformSchema.index({ isPublished: 1 });
platformSchema.index({ subCategory: 1 });

/* -------------------------------- */
/* Slug */
/* -------------------------------- */

platformSchema.pre("save", function () {
  if (!this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  } else {
    this.slug = slugify(this.slug, {
      lower: true,
      strict: true,
    });
  }
});

module.exports = mongoose.model("Platform", platformSchema);