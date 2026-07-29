const mongoose = require("mongoose");

/*
  Generic, reusable schema that powers every "card list" section
  on the Home Page: WhyChooseUs, BusinessServices, DetailedServices,
  Challenges, SolutionAreas, Benefits, ClientLogos, LeadershipTeam,
  PlatformCards (Services.jsx bottom section), WhyJJCPartner and CTA.

  Each section is stored as ONE document identified by a unique
  `sectionKey`, with an `items` sub-array that gets its own CRUD
  endpoints (add / update / delete / reorder item) so the whole
  thing behaves like full CRUD per section without 10+ near
  identical model/controller files.

  Field -> component mapping (frontend just picks what it needs):
    icon        -> react-icon name / key
    image       -> uploaded image (client logos, leader photos)
    title       -> main text (benefit text, person name, card title...)
    subtitle    -> secondary text (challenge "sub", person role...)
    description -> long text (card description)
    link        -> url (LinkedIn, external link...)
    order       -> sort order
*/

const imageSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
  },
  { _id: false }
);

const cardItemSchema = new mongoose.Schema(
  {
    icon: String,
    image: imageSchema,
    title: String,
    subtitle: String,
    description: String,
    link: String,
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: false }
);

const SECTION_KEYS = [
  "whyChooseUs",       // WhyChooseUs.jsx
  "businessServices",  // BusinessServices.jsx
  "detailedServices",  // DetailedServices.jsx
  "challenges",        // Challenges.jsx
  "solutionAreas",     // SolutionAreas.jsx
  "benefits",          // Benefits.jsx
  "clientLogos",       // ClientLogos.jsx
  "leadershipTeam",    // LeadershipTeam.jsx
  "platformCards",     // Services.jsx ("Your Useful Platform")
  "whyJJCPartner",     // WhyJJCPartner.jsx
  "cta",               // CTASection.jsx
  "deliveryProcess",   // DeliveryProcess.jsx (Timeline Steps)

  // New Sections
  "testimonials",      // Testimonials.jsx
  "faqs",              // FAQ.jsx
];

const homeCardSectionSchema = new mongoose.Schema(
  {
    sectionKey: {
      type: String,
      required: true,
      unique: true,
      enum: SECTION_KEYS,
    },

    tag: { type: String, default: "" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    outro: { type: String, default: "" },

    // Used by sections like CTA that need two call-to-action buttons
    primaryLabel: { type: String, default: "" },
    primaryLink: { type: String, default: "" },
    secondaryLabel: { type: String, default: "" },
    secondaryLink: { type: String, default: "" },

    items: [cardItemSchema],

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

homeCardSectionSchema.statics.SECTION_KEYS = SECTION_KEYS;

module.exports = mongoose.model("HomeCardSection", homeCardSectionSchema);
