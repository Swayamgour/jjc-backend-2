const mongoose = require("mongoose");
const seoSchema = require("../utils/seoSchema");

const { Schema } = mongoose;

const CtaSchema = new Schema(
    {
        text: { type: String, default: "" },
        link: { type: String, default: "" },
    },
    { _id: false }
);

const BreadcrumbSchema = new Schema(
    {
        parent: { type: String, default: "Insights" },
        parentLink: { type: String, default: "/blog" },
        current: { type: String, default: "" }, // override; auto-falls-back to industry label
    },
    { _id: false }
);

const BlogPostSchema = new Schema(
    {
        /* ---- Core content ---- */
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: { type: String, required: true }, // used as lede + card summary
        content: { type: String, default: "" }, // full HTML body

        /* ---- Taxonomy (matches your existing Platform/Industry slugs) ---- */
        platform: { type: String }, // e.g. "business-central"
        service: { type: String }, // e.g. "business-applications"
        industry: { type: String }, // e.g. "legal"
        type: {
            type: String,
            // required: true,
            // enum: [
            //     "Challenges",
            //     "Solutions",
            //     "How-to guide",
            //     "Best practices",
            //     "Market trends",
            //     "Features",
            //     "Future readiness",
            // ],
        },
        icon: { type: String, default: "chart" }, // erp | docs | chart | grid | device | shield | cloud | sales

        featureImage: {
            type: String,
            default: "",
        },

        /* ---- Meta / display ---- */
        readTime: { type: String, default: "" }, // "8 min read" — auto-computed if blank
        publishedAt: { type: Date, default: Date.now },

        /* ---- Hero section (fully editable, all optional overrides) ---- */
        eyebrow: { type: String, default: "" }, // auto-falls-back to "PlatformLabel · Type"
        takeaways: { type: [String], default: [] },
        ctaPrimary: { type: CtaSchema, default: () => ({ text: "Talk to us about this", link: "/contact" }) },
        ctaSecondary: { type: CtaSchema, default: () => ({ text: "More insights", link: "/blog" }) },
        breadcrumb: { type: BreadcrumbSchema, default: () => ({}) },

        /* ---- Publishing ---- */
        isPublished: { type: Boolean, default: true },
        author: { type: String, default: "JJC Systems" },

        /* ---- SEO (standardized across all page types) ---- */
        seo: { type: seoSchema, default: () => ({}) },
    },
    { timestamps: true }
);

/* Auto-generate slug from title if not supplied */
BlogPostSchema.pre("validate", function (next) {
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

/* Auto-compute readTime from content/description word count if not supplied */
BlogPostSchema.pre("save", function (next) {
    if (!this.readTime) {
        const text = (this.content || this.description || "").replace(/<[^>]*>/g, "");
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const minutes = Math.max(1, Math.round(words / 200));
        this.readTime = `${minutes} min read`;
    }
    next();
});

BlogPostSchema.index({ platform: 1, service: 1, industry: 1, type: 1 });
BlogPostSchema.index({ title: "text", description: "text", content: "text" });

module.exports = mongoose.model("BlogPost", BlogPostSchema);