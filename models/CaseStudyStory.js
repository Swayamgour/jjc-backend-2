const mongoose = require("mongoose");
const seoSchema = require("../utils/seoSchema");

// ======================================================
// SHARED SUB-SCHEMAS
// ======================================================

const buttonSchema = new mongoose.Schema(
    {
        label: String,
        link: String,
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

const breadcrumbSchema = new mongoose.Schema(
    {
        label: String,
        link: String,
    },
    { _id: false }
);

const subNavItemSchema = new mongoose.Schema(
    {
        label: String,
        link: String,
    },
    { _id: false }
);

// situation / approach → { eyebrow, title, paragraphs: [String] }
const sectionWithParagraphsSchema = new mongoose.Schema(
    {
        eyebrow: String,
        title: String,
        paragraphs: [String],
    },
    { _id: false }
);

// sourcing → { eyebrow, title, paragraphs: [String], summary }
const sourcingSchema = new mongoose.Schema(
    {
        eyebrow: String,
        title: String,
        paragraphs: [String],
        summary: String,
    },
    { _id: false }
);

const heroSchema = new mongoose.Schema(
    {
        eyebrow: String,
        title: String,
        subtitle: String,

        primaryButton: buttonSchema,
        secondaryButton: buttonSchema,

        glanceTitle: String,
        glance: [String],

        stats: [metricSchema],
    },
    { _id: false }
);

const resultsSchema = new mongoose.Schema(
    {
        eyebrow: String,
        title: String,
        description: String,

        metrics: [metricSchema],

        changesTitle: String,
        outcomes: [String],
    },
    { _id: false }
);

// platforms → { eyebrow, title, items: [{ tag, title, description }] }
const platformItemSchema = new mongoose.Schema(
    {
        tag: String,
        title: String,
        description: String,
    },
    { _id: false }
);

const platformsSchema = new mongoose.Schema(
    {
        eyebrow: String,
        title: String,
        items: [platformItemSchema],
    },
    { _id: false }
);

const processStepSchema = new mongoose.Schema(
    {
        step: Number,
        title: String,
        description: String,
    },
    { _id: false }
);

const transfersSchema = new mongoose.Schema(
    {
        eyebrow: String,
        title: String,
        description: String,

        warningTitle: String,
        warningDescription: String,

        approachTitle: String,
        process: [processStepSchema],
    },
    { _id: false }
);

const ctaSchema = new mongoose.Schema(
    {
        title: String,
        description: String,

        primaryButton: buttonSchema,
        secondaryButton: buttonSchema,

        note: String,
    },
    { _id: false }
);

// Related story: can point at a real CaseStudyStory doc (via `story`)
// and/or carry its own display fields as a fallback/override —
// same pattern as `relatedServices` on the Service model.
const relatedStorySchema = new mongoose.Schema({
    story: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CaseStudyStory",
    },
    title: String,
    slug: String,
    category: String,
});

// ======================================================
// MAIN SCHEMA
// ======================================================

const caseStudyStorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        parentCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CaseStudyCategory",
        },

        organization: String,
        country: String,
        tags: [String],

        breadcrumbs: [breadcrumbSchema],

        hero: heroSchema,

        subNavigation: [subNavItemSchema],

        situation: sectionWithParagraphsSchema,
        approach: sectionWithParagraphsSchema,

        results: resultsSchema,

        platforms: platformsSchema,

        transfers: transfersSchema,

        sourcing: sourcingSchema,

        cta: ctaSchema,

        relatedStoriesTitle: String,
        relatedStories: [relatedStorySchema],

        seo: { type: seoSchema, default: () => ({}) },

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

module.exports = mongoose.model(
    "CaseStudyStory",
    caseStudyStorySchema
);