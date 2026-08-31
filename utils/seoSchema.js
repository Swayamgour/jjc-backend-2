const mongoose = require("mongoose");

/**
 * Standard SEO sub-schema — used on EVERY content model so every page
 * type (service, platform, solution, industry, resource, case study,
 * case study story, blog post, guide, checklist, whitepaper, home page)
 * exposes the exact same dynamic SEO fields to the admin panel and the
 * public API:
 *
 *   metaTitle       - <title> tag
 *   metaDescription - <meta name="description">
 *   keywords        - comma-separated list, stored as an array of strings
 *   canonicalUrl    - <link rel="canonical">
 *   ogImage         - og:image (and twitter:image) URL
 *
 * Import this in a model with:
 *   const seoSchema = require("../utils/seoSchema");
 *   ...
 *   seo: { type: seoSchema, default: () => ({}) },
 */
const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, trim: true, default: "" },
    metaDescription: { type: String, trim: true, maxlength: 160, default: "" },
    keywords: { type: [String], default: [] }, // comma-separated on the client, stored as array
    canonicalUrl: { type: String, trim: true, default: "" },
    ogImage: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

module.exports = seoSchema;
