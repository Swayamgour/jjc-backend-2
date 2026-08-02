import mongoose from "mongoose";

const { Schema } = mongoose;

/* ---------- Reusable sub-schemas ---------- */

const HeroSlideSchema = new Schema(
  {
    eyebrow: String,
    title: { type: String, required: true },
    description: String,
    ctaText: String,
    ctaLink: String,
    image: String,
    imageAlt: String,
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const IconCardSchema = new Schema(
  {
    icon: String, // stores icon name e.g. "i-users" (resolved on frontend)
    title: { type: String, required: true },
    description: String,
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const PartnerRowSchema = new Schema(
  {
    icon: String,
    tag: String,
    title: { type: String, required: true },
    description: String,
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const BenefitSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const SolutionCardSchema = new Schema(
  {
    icon: String,
    tag: String,
    title: { type: String, required: true },
    description: String,
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const ProcessStepSchema = new Schema(
  {
    number: Number,
    title: { type: String, required: true },
    description: String,
  },
  { _id: true }
);

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    link: String,
    description: String,
    team: String,
  },
  { _id: true }
);

const ServiceFamilySchema = new Schema(
  {
    icon: String,
    title: { type: String, required: true },
    capabilities: Number,
    summary: String,
    team: String,
    services: [ServiceSchema],
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const StoryMetricSchema = new Schema(
  { value: String, label: String },
  { _id: false }
);

const SuccessStorySchema = new Schema(
  {
    industry: String,
    title: { type: String, required: true },
    summary: String,
    metrics: [StoryMetricSchema],
    outcomes: [String],
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const InsightSchema = new Schema(
  {
    icon: String,
    type: String, // "Guide" | "Blog" | "Resource" | "Checklist" | "FAQ"
    meta: String,
    title: { type: String, required: true },
    description: String,
    cta: String,
    link: String,
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

const ContactDetailSchema = new Schema(
  { icon: String, text: String },
  { _id: false }
);

const ContactInfoSchema = new Schema(
  {
    steps: [String],
    contactDetails: [ContactDetailSchema],
    organizationSizes: [String],
    interests: [String],
  },
  { _id: false }
);

const ClientLogoSchema = new Schema(
  {
    name: String,
    image: String, // Cloudinary URL
    order: { type: Number, default: 0 },
  },
  { _id: true }
);

/* ---------- Top-level HomePage schema (singleton) ---------- */

const HomePageSchema = new Schema(
  {
    // guarantees only ONE document ever exists
    singletonKey: { type: String, default: "home", unique: true },

    heroSlides: [HeroSlideSchema],

    whyIntro: {
      eyebrow: String,
      heading: String, // supports the "single partner" accent phrasing
    },
    whyCards: [IconCardSchema],
    partnerVisual: {
      heading: String,
      bullets: [String],
    },
    partnerRows: [PartnerRowSchema],

    benefitsIntro: {
      eyebrow: String,
      heading: String,
      lede: String,
    },
    benefits: [BenefitSchema],

    solutionsIntro: {
      eyebrow: String,
      heading: String,
      lede: String,
    },
    solutionCards: [SolutionCardSchema],
    solutionProcess: [ProcessStepSchema],
    solutionsFooter: {
      title: String,
      text: String,
      ctaText: String,
      ctaLink: String,
    },

    platformsIntro: {
      eyebrow: String,
      heading: String,
      summary: String,
    },
    platformsFooter: {
      title: String,
      text: String,
      ctaText: String,
      ctaLink: String,
    },

    servicesIntro: {
      eyebrow: String,
      heading: String,
      lede: String,
    },
    serviceFamilies: [ServiceFamilySchema],

    clientsIntro: {
      eyebrow: String,
      heading: String,
      lede: String,
    },
    clientLogos: [ClientLogoSchema],

    successStoriesIntro: {
      eyebrow: String,
      heading: String,
      lede: String,
    },
    successStories: [SuccessStorySchema],

    testimonialsIntro: {
      eyebrow: String,
      heading: String,
      lede: String,
    },

    insightsIntro: {
      eyebrow: String,
      heading: String,
      lede: String,
    },
    insights: [InsightSchema],

    contactIntro: {
      eyebrow: String,
      heading: String,
      lede: String,
    },
    contactInfo: ContactInfoSchema,

    seo: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("HomePage", HomePageSchema);