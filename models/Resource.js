const mongoose = require("mongoose");
const slugify = require("slugify");

// PDF blueprint: /insights/ section
// Blog, Guides, Resources, Checklists, FAQs
// Also topic-specific: m365-guides, azure-guides, sharepoint-resources etc.

const resourceSchema = new mongoose.Schema(
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

    category: {
      type: String,
      enum: ["Blog", "Guide", "Checklist", "FAQ", "Resource", "Whitepaper"],
      required: true,
    },

    // Topic cluster - maps to blueprint's insight sections
    topicCluster: {
      type: String,
      enum: [
        "microsoft-365",
        "azure",
        "sharepoint",
        "power-bi",
        "security",
        "dynamics-365",
        "power-platform",
        "teams",
        "general",
      ],
      default: "general",
    },

    // /insights/blog/ or /insights/microsoft-365-guides/ etc.
    urlPath: String,

    thumbnail: String, // Cloudinary URL

    excerpt: {
      type: String,
      maxlength: 400,
    },

    // Main content (rich text / markdown)
    content: {
      type: String,
      required: true,
    },

    // For checklists - structured checklist items
    checklistItems: [
      {
        item: String,
        isRequired: Boolean,
      },
    ],

    author: {
      name: String,
      avatar: String,
    },

    tags: [String],

    // Related service/platform pages (internal linking for SEO)
    relatedServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    relatedPlatforms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Platform",
      },
    ],

    readTime: Number, // minutes

    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    publishedAt: Date,

    seo: {
      metaTitle: String,
      metaDescription: { type: String, maxlength: 160 },
      keywords: [String],
      ogImage: String,
      canonicalUrl: String,
    },
  },
  { timestamps: true }
);

resourceSchema.pre("save", function (next) {
  if (this.isModified("title") || this.isNew) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.isModified("isPublished") && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Index for SEO queries
resourceSchema.index({ category: 1, topicCluster: 1 });
resourceSchema.index({ isPublished: 1, publishedAt: -1 });

module.exports = mongoose.model("Resource", resourceSchema);
