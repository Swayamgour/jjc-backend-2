const mongoose = require("mongoose");
const seoSchema = require("../utils/seoSchema");
const { Schema } = mongoose;

const CtaSchema = new Schema({ text: String, link: String }, { _id: false });

const FindingSchema = new Schema(
  {
    number: { type: Number, required: true }, // 01, 02...
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const FrameworkStageSchema = new Schema(
  {
    number: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const ImplicationSchema = new Schema(
  {
    role: { type: String, required: true }, // "For the CFO"
    text: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const ReferenceSchema = new Schema(
  {
    number: { type: Number, required: true },
    title: { type: String, required: true }, // "What is OneLake?"
    source: { type: String, required: true }, // "Microsoft Fabric documentation — ..."
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const RelatedWhitepaperOverrideSchema = new Schema(
  {
    whitepaper: { type: Schema.Types.ObjectId, ref: "Whitepaper" },
    titleOverride: String,
    descriptionOverride: String,
    linkOverride: String,
  },
  { _id: false }
);

const WhitepaperSchema = new Schema(
  {
    /* Core / list-card fields */
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true }, // list-card summary
    subtitle: { type: String, default: "" }, // hero lede, e.g. "An honest assessment of..."

    platform: { type: String, required: true },
    service: { type: String, required: true },
    industry: { type: String, required: true },
    icon: { type: String, default: "chart" },

    pages: { type: Number, default: 10 }, // drives the "14 pages" badge
    readTime: { type: String, default: "" }, // auto-computed if blank
    publishedAt: { type: Date, default: Date.now },

    /* Hero overrides */
    eyebrow: { type: String, default: "" }, // auto: "PlatformLabel · IndustryLabel"
    inThisPaper: { type: [String], default: [] }, // glance sidebar list
    ctaPrimary: { type: CtaSchema, default: () => ({ text: "Discuss this paper", link: "/contact" }) },
    ctaSecondary: { type: CtaSchema, default: () => ({ text: "Jump to the findings", link: "#findings" }) },

    /* Abstract */
    abstractHeading: { type: String, default: "" }, // usually same as subtitle
    abstractParagraphs: { type: [String], default: [] },

    /* Key findings */
    findingsHeading: { type: String, default: "Four things this paper argues" },
    findingsLede: { type: String, default: "If you read nothing else, read these. The analysis that follows sets out the evidence for each." },
    findings: { type: [FindingSchema], default: [] },

    /* Analysis — long form body, section by section */
    analysisHeading: { type: String, default: "The argument in full" },
    analysisBody: { type: String, default: "" }, // full HTML (h2/p/ul blocks)

    /* Framework */
    frameworkHeading: { type: String, default: "Something you can apply without us" },
    frameworkLede: { type: String, default: "" },
    frameworkName: { type: String, default: "" }, // "The consolidation sequence"
    frameworkDescription: { type: String, default: "" }, // "Five stages. Institutions that skip..."
    frameworkStages: { type: [FrameworkStageSchema], default: [] },

    /* Implications */
    implicationsHeading: { type: String, default: "What this means, depending on your seat" },
    implicationsLede: { type: String, default: "" },
    implications: { type: [ImplicationSchema], default: [] },

    /* References */
    referencesHeading: { type: String, default: "Where to check this for yourself" },
    referencesLede: { type: String, default: "" },
    references: { type: [ReferenceSchema], default: [] },
    referencesNote: { type: String, default: "" },

    /* CTA band */
    ctaHeading: { type: String, default: "Recognise the situation?" },
    ctaText: { type: String, default: "" },
    ctaBandPrimary: { type: CtaSchema, default: () => ({ text: "Discuss this paper", link: "/contact" }) },
    ctaBandSecondary: { type: CtaSchema, default: () => ({ text: "Run the related checklist", link: "/checklists" }) },

    /* Related */
    relatedWhitepapers: { type: [RelatedWhitepaperOverrideSchema], default: [] },

    /* Publishing / SEO */
    isPublished: { type: Boolean, default: true },
    author: { type: String, default: "JJC Systems" },
    seo: { type: seoSchema, default: () => ({}) },
  },
  { timestamps: true }
);

WhitepaperSchema.pre("validate", function (next) {
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

WhitepaperSchema.pre("save", function (next) {
  if (!this.readTime) {
    const text = [this.description, this.subtitle, ...this.abstractParagraphs, this.analysisBody]
      .filter(Boolean)
      .join(" ")
      .replace(/<[^>]*>/g, "");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    this.readTime = `${minutes} min read`;
  }
  next();
});

WhitepaperSchema.index({ platform: 1, service: 1, industry: 1 });
WhitepaperSchema.index({ title: "text", description: "text", analysisBody: "text" });

module.exports = mongoose.model("Whitepaper", WhitepaperSchema);