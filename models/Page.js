const mongoose = require("mongoose");
const slugify = require("slugify");


/* ==============================================================
 UNIFIED PAGE MODEL
 Handles THREE content types from one schema + one collection:
   - "service"   (e.g. IT Strategy & Consulting)
   - "industry"  (e.g. Healthcare)
   - "platform"  (e.g. Microsoft 365)

 WHY ONE MODEL:
 All three templates share ~80% of their sections (hero, a
 problem/overview block, an outcomes metrics grid, a "how we
 help" cards row, a 5-step approach, a "why us" grid, success
 stories, insights, a CTA band, related items and SEO). Only a
 handful of sections are type-specific. Rather than maintaining
 three near-identical models/controllers/routes, every section
 lives on one schema. Sections that don't apply to a given
 `type` are simply left empty — the frontend decides what to
 render based on `type` (and on whether a section actually has
 data, via the `hasX` virtuals/helpers below).

 TYPE-SPECIFIC SECTIONS:
   service  -> taskBoard              ("What's included")
   platform -> capabilities           ("What the platform gives you / direction")
             -> industryUseCases      ("What organizations actually use it for")
   industry -> sectorOverview         ("The sector" sub-sector cards)
             -> applicationLayer      ("The application layer ... depend on")

 SHARED "SECOND-LEVEL" SECTION:
   platform + industry both show a tag/title/description
   consulting block (Implementation/Customization/Support/
   Integration). Modeled once as `consultingServices` and reused
   by both. Industry additionally lists concrete Dynamics 365
   apps in the same tag/title/description shape -> `appGrid`.
================================================================ */


/* ---------------- Reusable Sub-Schemas ---------------- */

const imageSchema = new mongoose.Schema(
  { url: String, publicId: String },
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

// Generic "title + description" card, used by several sections
const simpleItemSchema = new mongoose.Schema(
  {
    _id: false,
    title: String,
    description: String,
    // Industry challenges show a secondary line under each item:
    // "THE OUTCOME LEADERS ASK FOR". Optional everywhere else.
    outcomeAsk: String,
  },
  { _id: false }
);

// Generic "tag + title + description" row, used by taskBoard,
// applicationLayer, consultingServices, appGrid
const tagItemSchema = new mongoose.Schema(
  {
    _id: false,
    tag: String, // e.g. "core" | "clinical" | "implementation"
    title: String,
    description: String,
  },
  { _id: false }
);

// Generic "icon + title + description (+ points[])" card, used by
// pillars/howWeHelp, whyUs, capabilities
const iconItemSchema = new mongoose.Schema(
  {
    _id: false,
    icon: String,
    title: String,
    description: String,
    points: [String], // optional checklist under the card
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
    tag: String, // "Resource" | "Blog" | "Checklist"
    meta: String, // "Download" | "6 min read" | "10 items"
    title: String,
    description: String,
    link: String,
  },
  { _id: false }
);

// A section with an eyebrow/title/subtitle header + a closing
// callout note is extremely common. Individual section schemas
// below embed these fields directly (rather than nesting one
// more level) so admin-panel forms stay flat and simple.


/* ==============================================================
 MAIN SCHEMA
================================================================ */

const pageSchema = new mongoose.Schema(
  {

    /* ---- discriminator-by-field (not a Mongoose discriminator
       on purpose — keeps one flat collection, one API surface) ---- */
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
      stats: [statSchema], // the 4-box strip
    },


    /* ==============================
     2. PROBLEM / OVERVIEW
     service  -> "Why do it" / symptoms
     platform -> "The platform is fine, the deployment isn't"
     industry -> "What healthcare executives tell us is broken"
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
     "The sector" — sub-sector cards, e.g. Hospitals & health
     systems, Ambulatory & physician groups, ...
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
     "The application layer healthcare organizations depend on"
    ================================ */
    applicationLayer: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [tagItemSchema], // tag = Clinical/Operational/Financial/Governance
    },


    /* ==============================
     2d. CAPABILITIES & DIRECTION  (platform only)
     "What the platform gives you, and where Microsoft is
     taking it" + industry use-case cards
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
      items: [simpleItemSchema], // title = "Healthcare", description = use case
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

      // platform's extra "business outcomes Microsoft associates
      // with this platform" block sits under the same section
      associatedTitle: String,
      associatedSubtitle: String,
      associatedItems: [simpleItemSchema],
      associatedNote: String,
    },


    /* ==============================
     4. HOW WE HELP  ("pillars" / "three ways we work with...")
    ================================ */
    pillars: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [iconItemSchema],
    },


    /* ==============================
     5a. TASK BOARD  (service only — "What's included")
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
     5b. CONSULTING SERVICES
     (platform + industry — Implementation / Customization /
     Support / Integration of the platform/product)
    ================================ */
    consultingServices: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [tagItemSchema], // tag = implementation/customization/support/integration
      note: String,
    },

    // industry-only: concrete app grid, e.g. "The Dynamics 365
    // applications that earn their place in healthcare"
    appGrid: {
      eyebrow: String,
      title: String,
      subtitle: String,
      items: [tagItemSchema], // tag = Customer Service/Field Service/Finance/...
      note: String, // e.g. the Copilot/AI caution callout
    },


    /* ==============================
     6. APPROACH (5 steps)
    ================================ */
    approach: {
      eyebrow: String,
      title: String,
      subtitle: String,
      steps: [stepSchema],
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
     Generic now: can point at any other Page (service, industry
     or platform), e.g. "Related platforms" on a platform page,
     "Related industries" on an industry page, "Related services"
     on a service page.
    ================================ */
    relatedItems: {
      eyebrow: { type: String, default: "Often combined with" },
      title: { type: String, default: "Related" },
      items: [
        {
          _id: false,
          page: { type: mongoose.Schema.Types.ObjectId, ref: "Page" },
          icon: String,
          title: String, // optional override; falls back to page.title
          description: String, // optional override
          link: String, // optional override; falls back to page.urlPath
        },
      ],
    },


    /* ==============================
     TAXONOMY
     Same pattern as the original Service model: `subCategory`
     stores the 3rd-level ITEM _id from Category.subcategories[].
     items[], and `category` is auto-derived from it. This works
     identically for all three types as long as your Category
     collection has a top-level doc for each area (e.g. a
     "Services" doc, an "Industries" doc, a "Platforms" doc), each
     with its own subcategories/items.
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
      metaDescription: { type: String, maxlength: 160 },
      keywords: [String],
      ogImage: String,
      canonicalUrl: String,
    },

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
