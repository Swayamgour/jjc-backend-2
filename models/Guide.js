const mongoose = require("mongoose");
const { Schema } = mongoose;

/* ---------- Sub-schemas ---------- */

const CtaSchema = new Schema({ text: String, link: String }, { _id: false });

const PrerequisiteSchema = new Schema(
  { label: { type: String, required: true }, text: { type: String, required: true } },
  { _id: false }
);

const ConceptCardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "i-check" },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const SettingRowSchema = new Schema(
  { term: { type: String, required: true }, definition: { type: String, required: true } },
  { _id: false }
);

const ConfigStepSchema = new Schema(
  {
    number: { type: Number, required: true }, // 01, 02...
    title: { type: String, required: true },
    paragraphs: { type: [String], default: [] },
    settings: { type: [SettingRowSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const PitfallSchema = new Schema(
  { title: { type: String, required: true }, description: { type: String, required: true } },
  { _id: true }
);

const RelatedGuideOverrideSchema = new Schema(
  {
    guide: { type: Schema.Types.ObjectId, ref: "Guide" },
    // optional manual overrides if you don't want auto industry-based related guides
    titleOverride: String,
    descriptionOverride: String,
    linkOverride: String,
  },
  { _id: false }
);

/* ---------- Main Guide schema ---------- */

const GuideSchema = new Schema(
  {
    /* Core / list-card fields */
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },

    platform: { type: String, required: true },
    service: { type: String, required: true },
    industry: { type: String, required: true },
    level: { type: String, required: true, enum: ["Foundation", "Intermediate", "Advanced"] },
    icon: { type: String, default: "chart" },

    readTime: { type: String, default: "" }, // auto-computed if blank
    publishedAt: { type: Date, default: Date.now },

    /* Hero section overrides */
    eyebrow: { type: String, default: "" }, // auto: "PlatformLabel · Level"
    keyPractices: { type: [String], default: [] }, // glance sidebar list
    ctaPrimary: { type: CtaSchema, default: () => ({ text: "Get help with this", link: "/contact" }) },
    ctaSecondary: { type: CtaSchema, default: () => ({ text: "Skip to configuration", link: "#config" }) },

    /* Stats strip */
    typicalEffort: { type: String, default: "" }, // e.g. "3–6 weeks including a parallel quarter"
    writtenFor: { type: String, default: "" }, // e.g. "Manufacturing" — auto-falls back to industry label

    /* Why section */
    businessSummaryHeading: { type: String, default: "If you own the outcome" },
    businessSummary: { type: String, default: "" },
    technicalSummaryHeading: { type: String, default: "If you have to build it" },
    technicalSummary: { type: String, default: "" },
    problemHeading: { type: String, default: "The problem this solves" },
    problemParagraphs: { type: [String], default: [] },

    /* Before you start */
    prerequisites: { type: [PrerequisiteSchema], default: [] },

    /* Concepts */
    conceptsHeading: { type: String, default: "The concepts worth understanding first" },
    conceptsLede: { type: String, default: "" },
    concepts: { type: [ConceptCardSchema], default: [] },

    /* Configuration */
    configHeading: { type: String, default: "Step by step" },
    configLede: { type: String, default: "" },
    configSteps: { type: [ConfigStepSchema], default: [] },

    /* Verify */
    verifySteps: { type: [String], default: [] },

    /* Best practice */
    bestPracticeHeading: { type: String, default: "What we do on every engagement of this type" },
    bestPractices: { type: [String], default: [] },

    /* Pitfalls */
    pitfallsHeading: { type: String, default: "What catches most first attempts" },
    pitfallsLede: { type: String, default: "" },
    pitfalls: { type: [PitfallSchema], default: [] },

    /* Checklist */
    checklistTitle: { type: String, default: "Completion checklist" },
    checklistItems: { type: [String], default: [] },

    /* CTA band */
    ctaHeading: { type: String, default: "Want a second pair of eyes?" },
    ctaText: { type: String, default: "" },
    ctaBandPrimary: { type: CtaSchema, default: () => ({ text: "Request a consultation", link: "/contact" }) },
    ctaBandSecondary: { type: CtaSchema, default: () => ({}) }, // e.g. "See our X page" -> /platforms/x

    /* Related guides — optional manual picks; falls back to same-industry auto if empty */
    relatedGuides: { type: [RelatedGuideOverrideSchema], default: [] },

    /* Publishing / SEO */
    isPublished: { type: Boolean, default: true },
    author: { type: String, default: "JJC Systems" },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

GuideSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
  next();
});

GuideSchema.pre("save", function (next) {
  if (!this.readTime) {
    const text = [this.description, this.businessSummary, this.technicalSummary, ...this.problemParagraphs]
      .filter(Boolean)
      .join(" ")
      .replace(/<[^>]*>/g, "");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    this.readTime = `${minutes} min read`;
  }
  next();
});

GuideSchema.index({ platform: 1, service: 1, industry: 1, level: 1 });
GuideSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Guide", GuideSchema);