const mongoose = require("mongoose");
const slugify = require("slugify");

// PDF blueprint: Solution pages are OUTCOME-based, not product-based
// Modern Work, Security, Infrastructure, Data & AI, Business Applications,
// Digital & App Innovation, M365 Optimization, Cloud Migration,
// SharePoint Intranet, Power BI Reporting, Workflow Automation,
// Endpoint Management, CRM & ERP Modernization, Managed Services

const solutionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    // e.g. /solutions/modern-work/
    urlPath: String,

    shortDescription: {
      type: String,
      maxlength: 300,
    },

    hero: {
      heading: String,
      subHeading: String,
      image: String,
      ctaText: { type: String, default: "Talk to an Expert" },
    },

    // Business outcomes (not technical features)
    outcomes: [
      {
        title: String,
        description: String,
        icon: String,
      },
    ],

    // Business problems this solution addresses
    businessProblems: [
      {
        problem: String,
        solution: String,
      },
    ],

    // Which Microsoft platforms power this solution
    platforms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Platform",
      },
    ],

    // Link to the more detailed service page
    relatedServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    caseStudies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CaseStudy",
      },
    ],

    faqs: [
      {
        question: String,
        answer: String,
      },
    ],

    seo: {
      metaTitle: String,
      metaDescription: { type: String, maxlength: 160 },
      keywords: [String],
      ogImage: String,
      canonicalUrl: String,
    },

    isPublished: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

solutionSchema.pre("save", function () {
  if (this.isModified("title") || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  // next();
});



module.exports = mongoose.model("Solution", solutionSchema);
