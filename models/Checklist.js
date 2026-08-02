const mongoose = require("mongoose");
const { Schema } = mongoose;

const CtaSchema = new Schema({ text: String, link: String }, { _id: false });

const RunWithSchema = new Schema(
    { label: { type: String, required: true }, text: { type: String, required: true } },
    { _id: false }
);

const CheckItemSchema = new Schema(
    {
        label: { type: String, required: true }, // bold line, e.g. "Microsoft 365 E5 or the Compliance add-on confirmed"
        note: { type: String, required: true }, // the "why it matters" sentence
        order: { type: Number, default: 0 },
    },
    { _id: true }
);

const CheckSectionSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        items: { type: [CheckItemSchema], default: [] },
        order: { type: Number, default: 0 },
    },
    { _id: true }
);

const ScoreBandSchema = new Schema(
    {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        label: { type: String, required: true }, // "Significant gaps"
        description: { type: String },
    },
    { _id: false }
);

const GapCardSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, default: "i-target" },
        order: { type: Number, default: 0 },
    },
    { _id: true }
);

const RelatedChecklistOverrideSchema = new Schema(
    {
        checklist: { type: Schema.Types.ObjectId, ref: "Checklist" },
        titleOverride: String,
        descriptionOverride: String,
        linkOverride: String,
    },
    { _id: false }
);

const ChecklistSchema = new Schema(
    {
        /* Core / list-card fields */
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: { type: String, required: true },

        platform: { type: String, required: true },
        service: { type: String, required: true },
        industry: { type: String, required: true },
        badge: { type: String, required: true }, // "Readiness" | "Audit" | "Compliance" | "Health check" | "Go-live"
        icon: { type: String, default: "chart" },
        difficulty: { type: String, default: "Advanced", enum: ["Foundation", "Intermediate", "Advanced"] },

        publishedAt: { type: Date, default: Date.now },

        /* Hero */
        eyebrow: { type: String, default: "" }, // auto: "PlatformLabel · Badge"
        ctaPrimary: { type: CtaSchema, default: () => ({ text: "Start the checklist", link: "#checklist" }) },
        ctaSecondary: { type: CtaSchema, default: () => ({ text: "Get help with the gaps", link: "/contact" }) },
        beforeYouStart: { type: [String], default: [] }, // glance sidebar list

        /* Stats strip */
        typicalEffort: { type: String, default: "" }, // e.g. "1 week to assess, plus a rehearsal"
        writtenFor: { type: String, default: "" }, // auto-falls back to industry label

        /* Why section */
        whyHeading: { type: String, default: "What this checklist is for" },
        whyParagraphs: { type: [String], default: [] },
        runWith: { type: [RunWithSchema], default: [] },

        /* Checklist body */
        checklistHeading: { type: String, default: "" },
        checklistLede: { type: String, default: "" },
        sections: { type: [CheckSectionSchema], default: [] },

        /* Score */
        scoreHeading: { type: String, default: "Read this against the number above" },
        scoreLede: { type: String, default: "" },
        scoreBands: {
            type: [ScoreBandSchema],
            default: () => [
                { min: 0, max: 59, label: "Significant gaps", description: "" },
                { min: 60, max: 84, label: "Mostly ready, with known gaps", description: "" },
                { min: 85, max: 100, label: "Ready", description: "" },
            ],
        },
        scoreNote: {
            type: String,
            default: "Your score highlights automatically as you tick items above. Nothing is saved, sent or tracked — refreshing the page clears it.",
        },

        /* Gaps */
        gapsHeading: { type: String, default: "If you could not tick these, start here" },
        gapsLede: { type: String, default: "" },
        gapCards: { type: [GapCardSchema], default: [] },

        /* CTA band */
        ctaHeading: { type: String, default: "Want a second opinion on your score?" },
        ctaText: { type: String, default: "" },
        ctaBandPrimary: { type: CtaSchema, default: () => ({ text: "Talk through your result", link: "/contact" }) },
        ctaBandSecondary: { type: CtaSchema, default: () => ({ text: "Read the related guides", link: "/guides" }) },

        /* Related */
        relatedChecklists: { type: [RelatedChecklistOverrideSchema], default: [] },

        /* Publishing / SEO */
        isPublished: { type: Boolean, default: true },
        author: { type: String, default: "JJC Systems" },
        seoTitle: { type: String, default: "" },
        seoDescription: { type: String, default: "" },
    },
    { timestamps: true }
);

ChecklistSchema.pre("validate", function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
    }
    if (!this.checklistHeading && this.totalChecks) {
        this.checklistHeading = `${this.totalChecks} checks, in the order we would run them`;
    }
    next();
});

/* Virtual: total check count across all sections */
ChecklistSchema.virtual("totalChecks").get(function () {
    return (this.sections || []).reduce((sum, s) => sum + (s.items?.length || 0), 0);
});
ChecklistSchema.set("toJSON", { virtuals: true });
ChecklistSchema.set("toObject", { virtuals: true });

ChecklistSchema.index({ platform: 1, service: 1, industry: 1, badge: 1 });
ChecklistSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Checklist", ChecklistSchema);