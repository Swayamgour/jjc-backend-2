const mongoose = require("mongoose");
const slugify = require("slugify");


/* ---------------- Common Sub-Schemas ---------------- */

const imageSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
  },
  { _id: false }
);


const statSchema = new mongoose.Schema(
  {
    value: String, // e.g. "2-4 wks"
    label: String, // e.g. "Typical assessment duration"
  },
  { _id: false }
);


const metricSchema = new mongoose.Schema(
  {
    label: String, // e.g. "Spend recovered"
    value: String, // e.g. "10-25%"
    description: String,
  },
  { _id: false }
);


/* ---------------- Service Schema ---------------- */

const serviceSchema = new mongoose.Schema(
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
    },


    badge: String,


    shortDescription: {
      type: String,
      required: true,
    },


    /* ==============================
     1. HERO (top banner + "at a glance" card + stats strip)
    ================================ */

    hero: {

      eyebrow: String, // e.g. "Strategy & Transformation"

      heading: {
        type: String,
        required: true,
      },

      lede: String,

      primaryCtaText: {
        type: String,
        default: "Book a consultation",
      },

      primaryCtaLink: {
        type: String,
        default: "/contact",
      },

      secondaryCtaText: {
        type: String,
        default: "See what's included",
      },

      secondaryCtaAnchor: {
        type: String,
        default: "#included",
      },

      image: imageSchema, // optional, not shown in this template but kept for reuse

      glance: {
        title: {
          type: String,
          default: "At a glance",
        },
        items: [String], // short bullet lines
      },

      stats: [statSchema], // the 4-box strip at the bottom of hero

    },




    /* ==============================
     2. CHALLENGES ("Why do it")
    ================================ */

    challenges: {

      eyebrow: String,

      title: String,

      subtitle: String,

      items: [
        {
          _id: false,
          title: String,
          description: String,
        },
      ],

      note: String, // the callout box text (plain part)

      noteHighlight: String, // the bold sentence inside the callout

    },




    /* ==============================
     3. OUTCOMES / METRICS ("What you get")
    ================================ */

    outcomes: {

      eyebrow: String,

      title: String,

      subtitle: String,

      metrics: [metricSchema],

      note: String, // "How to read these:" note

    },




    /* ==============================
     4. PILLARS ("How we can help" — 3 cards)
    ================================ */

    pillars: {

      eyebrow: String,

      title: String,

      subtitle: String,

      items: [
        {
          _id: false,
          icon: String,
          title: String,
          description: String,
          points: [String], // the checklist under each pillar
        },
      ],

    },




    /* ==============================
     5. TASK BOARD ("What's included")
    ================================ */

    taskBoard: {

      eyebrow: String,

      title: String,

      subtitle: String,

      tasks: [
        {
          _id: false,
          tag: {
            type: String,
            enum: ["core", "industry", "challenge"],
            default: "core",
          },
          title: String,
          description: String,
        },
      ],

    },




    /* ==============================
     6. APPROACH ("How the engagement runs" — 5 steps)
    ================================ */

    approach: {

      eyebrow: String,

      title: String,

      subtitle: String,

      steps: [
        {
          _id: false,
          title: String,
          description: String,
        },
      ],

      note: String, // "You own everything we produce." box

    },




    /* ==============================
     7. WHY US (reasons grid)
    ================================ */

    whyUs: {

      eyebrow: String,

      title: String,

      subtitle: String,

      items: [
        {
          _id: false,
          icon: String,
          title: String,
          description: String,
        },
      ],

    },




    /* ==============================
     8. SUCCESS STORIES
    ================================ */

    successStories: {

      eyebrow: String,

      title: String,

      subtitle: String,

      stories: [
        {
          _id: false,
          industry: String,
          isSample: {
            type: Boolean,
            default: true,
          },
          title: String,
          summary: String,
          metrics: [statSchema], // e.g. { value: "9 -> 4", label: "Active initiatives" }
          outcomes: [String], // "What changed" bullet list
          ctaLink: {
            type: String,
            default: "/contact",
          },
        },
      ],

      disclaimer: String,

    },




    /* ==============================
     9. INSIGHTS (reading list block)
     Kept as manual entries so this doesn't depend on a
     separate blog/Insight model. Leave `posts` empty to
     let the frontend fall back to global insights.
    ================================ */

    insights: {

      eyebrow: String,

      title: String,

      subtitle: String,

      posts: [
        {
          _id: false,
          tag: String, // "Resource" | "Blog" | "Checklist"
          meta: String, // "Download" | "6 min read" | "10 items"
          title: String,
          description: String,
          link: String,
        },
      ],

    },




    /* ==============================
     10. FINAL CTA BAND
    ================================ */

    cta: {

      title: String,

      description: String,

      primaryLabel: {
        type: String,
        default: "Book a consultation",
      },

      primaryLink: {
        type: String,
        default: "/contact",
      },

      secondaryLabel: String,

      secondaryLink: String,

      note: String, // "We reply to every message within one business day."

    },




    /* ==============================
     11. RELATED SERVICES
    ================================ */

    relatedServices: {

      eyebrow: {
        type: String,
        default: "Often combined with",
      },

      title: {
        type: String,
        default: "Related services",
      },

      items: [
        {
          _id: false,
          service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
          },
          icon: String,
          title: String, // optional override; falls back to service.title
          description: String, // optional override
          link: String, // optional override; falls back to service.urlPath
        },
      ],

    },




    /* ==============================
     TAXONOMY
    ================================ */

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },


    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },




    seo: {

      metaTitle: String,

      metaDescription: {
        type: String,
        maxlength: 160,
      },

      keywords: [String],

      ogImage: String,

      canonicalUrl: String,

    },



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



serviceSchema.index({ slug: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ subCategory: 1 });



serviceSchema.pre("save", function () {

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



module.exports = mongoose.model(
  "Service",
  serviceSchema
);
