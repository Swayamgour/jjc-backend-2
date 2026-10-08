const mongoose = require("mongoose");
const slugify = require("slugify");
const seoSchema = require("../utils/seoSchema");


/* ==============================================================
 UNIFIED PAGE MODEL
 Handles THREE content types from one schema + one collection:
   - "service"   (e.g. IT Strategy & Consulting)
   - "industry"  (e.g. Healthcare)
   - "platform"  (e.g. Microsoft 365)

 All sections live on one schema. Sections that don't apply to a
 given `type` are simply left empty — the frontend renders a
 section only when it actually has data.

 TYPE-SPECIFIC SECTIONS:
   service  -> taskBoard, definition, whoFor, microsoftPlatforms
   platform -> capabilities, industryUseCases
   industry -> sectorOverview, applicationLayer

 SHARED: consultingServices (platform + industry), appGrid (industry)
 SHARED: faqs (any type)

 RICH TEXT NOTE:
   Any field documented as "rich" (definition.paragraphs,
   faqs.items[].answer, whoFor.honestNote, ...) supports inline
   links using markdown syntax:  [managed IT](/services/managed-it-services)
   The frontend converts these into <a> tags (renderRichText util).
================================================================ */


/* ---------------- Reusable Sub-Schemas ---------------- */

const imageSchema = new mongoose.Schema(
  { url: String, publicId: String },
  { _id: false }
);

const statSchema = new mongoose.Schema(
  {
    value: String,
    label: String,
  },
  { _id: false }
);

const metricSchema = new mongoose.Schema(
  {
    label: String,
    value: String,
    description: String,
  },
  { _id: false }
);

const simpleItemSchema = new mongoose.Schema(
  {
    _id: false,
    title: String,
    description: String,
    outcomeAsk: String,
  },
  { _id: false }
);

const tagItemSchema = new mongoose.Schema(
  {
    _id: false,
    tag: String,
    title: String,
    description: String,
  },
  { _id: false }
);

const iconItemSchema = new mongoose.Schema(
  {
    _id: false,
    icon: String,
    title: String,
    description: String,
    points: [String],
  },
  { _id: false }
);

// "icon + title + description + tag" — used by definition.layers
const layerItemSchema = new mongoose.Schema(
  {
    _id: false,
    icon: String,
    title: String,
    description: String,
    tag: String, // e.g. "This page" | "Consulting" | "Delivery"
  },
  { _id: false }
);

// FAQ entry. `answer` is rich text (supports [label](url) links)
const faqItemSchema = new mongoose.Schema(
  {
    _id: false,
    question: { type: String, required: true },
    answer: { type: String, required: true },
    open: { type: Boolean, default: false }, // expanded by default
  },
  { _id: false }
);

const stepSchema = new mongoose.Schema(
  {
    _id: false,
    title: String,
    description: String,
  },
  { _id: false }
);

const storySchema = new mongoose.Schema(
  {
    _id: false,
    industry: String,
    isSample: { type: Boolean, default: true },
    title: String,
    summary: String,
    metrics: [statSchema],
    outcomes: [String],
    ctaLink: { type: String, default: "/contact" },
  },
  { _id: false }
);

const insightPostSchema = new mongoose.Schema(
  {
    _id: false,
    tag: String,
    meta: String,
    title: String,
    description: String,
    link: String,
  },
  { _id: false }
);


/* ==============================================================
 MAIN SCHEMA
================================================================ */

const pageSchema = new mongoose.Schema(
  {

    type: {
      type: String,
      enum: ["service", "industry", "platform"],
      required: true,
    },

    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    urlPath: String,
    badge: String,
    shortDescription: { type: String, required: true },


    /* ==============================
     1. HERO
    ================================ */
    hero: {
      eyebrow: String,
      heading: { type: String, required: true },
      lede: String,
      primaryCtaText: { type: String, default: "Book a consultation" },
      primaryCtaLink: { type: String, default: "/contact" },
      secondaryCtaText: { type: String, default: "See what's included" },
      secondaryCtaAnchor: { type: String, default: "#included" },
      image: imageSchema,
      glance: {
        title: { type: String, default: "At a glance" },
        items: [String],
      },
      stats: [statSchema],
    },


    /* ==============================
     1b. DEFINITION / "THE BASICS"   (service)
     "What is IT strategy consulting?" + layers strip + copy.
     paragraphs[] are RICH TEXT (supports [label](url) links).
    ================================ */
    definition: {
      eyebrow: String, // "The basics"
      title: String, // "What is IT strategy consulting?"
      layersLabel: String, // aria-label for the layers strip
      layers: [layerItemSchema],
      paragraphs: [String], // rich text
    },


    /* ==============================
     2. PROBLEM / OVERVIEW
    ================================ */
    challenges: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [simpleItemSchema],
      note: String,
      noteHighlight: String,
    },


    /* ==============================
     2b. SECTOR OVERVIEW  (industry only)
    ================================ */
    sectorOverview: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [simpleItemSchema],
      note: String,
    },


    /* ==============================
     2c. APPLICATION LAYER  (industry only)
    ================================ */
    applicationLayer: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [tagItemSchema],
    },


    /* ==============================
     2d. CAPABILITIES & DIRECTION  (platform only)
    ================================ */
    capabilities: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [iconItemSchema],
      note: String,
    },

    industryUseCases: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [simpleItemSchema],
    },


    /* ==============================
     3. OUTCOMES / METRICS
    ================================ */
    outcomes: {
      eyebrow: String,
      title: String,
      subtitle: String,
      metrics: [metricSchema],
      note: String,

      associatedTitle: String,
      associatedSubtitle: String,
      associatedItems: [simpleItemSchema],
      associatedNote: String,
    },


    /* ==============================
     4. HOW WE HELP
    ================================ */
    pillars: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [iconItemSchema],
    },


    /* ==============================
     5a. TASK BOARD  (service only)
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
     5b. CONSULTING SERVICES  (platform + industry)
    ================================ */
    consultingServices: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [tagItemSchema],
      note: String,
    },

    appGrid: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [tagItemSchema],
      note: String,
    },


    /* ==============================
     6. APPROACH
    ================================ */
    approach: {
      eyebrow: String,
      title: String,
      subtitle: String,
      steps: [stepSchema],
      note: String,
    },


    /* ==============================
     6b. WHO IT'S FOR   (service)
     items[] = checklist lines. honestNote = the "you probably
     don't need us yet" callout beside the heading.
    ================================ */
    whoFor: {
      eyebrow: String, // "Who it's for"
      title: String,
      subtitle: String,
      honestNote: String,
      items: [String],
    },


    /* ==============================
     6c. MICROSOFT PLATFORMS   (service)
     "Where Microsoft technology fits into the plan"
     note = closing line ("Where a non-Microsoft tool is the
     better answer, the plan says so.")
    ================================ */
    microsoftPlatforms: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [iconItemSchema], // icon, title, description
      note: String,
    },


    /* ==============================
     7. WHY US
    ================================ */
    whyUs: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [iconItemSchema],
    },


    /* ==============================
     8. SUCCESS STORIES
    ================================ */
    successStories: {
      eyebrow: String,
      title: String,
      subtitle: String,
      stories: [storySchema],
      disclaimer: String,
    },


    /* ==============================
     9. INSIGHTS
    ================================ */
    insights: {
      eyebrow: String,
      title: String,
      subtitle: String,
      posts: [insightPostSchema],
    },


    /* ==============================
     10. FINAL CTA BAND
    ================================ */
    cta: {
      title: String,
      description: String,
      primaryLabel: { type: String, default: "Book a consultation" },
      primaryLink: { type: String, default: "/contact" },
      secondaryLabel: String,
      secondaryLink: String,
      note: String,
    },


    /* ==============================
     11. RELATED ITEMS
    ================================ */
    relatedItems: {
      eyebrow: { type: String, default: "Often combined with" },
      title: { type: String, default: "Related" },
      items: [
        {
          _id: false,
          page: { type: mongoose.Schema.Types.ObjectId, ref: "Page" },
          icon: String,
          title: String,
          description: String,
          link: String,
        },
      ],
    },


    /* ==============================
     12. FAQs   (any type)
     answer is RICH TEXT (supports [label](url) links).
    ================================ */
    faqs: {
      eyebrow: { type: String, default: "FAQs" },
      title: { type: String, default: "Frequently asked questions" },
      helpText: { type: String, default: "Can't find your question?" },
      helpLinkText: { type: String, default: "Ask us directly" },
      helpLinkHref: { type: String, default: "/contact" },
      items: [faqItemSchema],
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


    seo: { type: seoSchema, default: () => ({}) },

    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },

  },
  { timestamps: true }
);


pageSchema.index({ slug: 1 });
pageSchema.index({ type: 1 });
pageSchema.index({ category: 1 });
pageSchema.index({ subCategory: 1 });
pageSchema.index({ type: 1, isPublished: 1 });


pageSchema.pre("save", function () {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  } else {
    this.slug = slugify(this.slug, { lower: true, strict: true });
  }
});


module.exports = mongoose.model("Page", pageSchema);