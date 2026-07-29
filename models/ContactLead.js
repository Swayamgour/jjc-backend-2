const mongoose = require("mongoose");

// Blueprint has 3 CTAs: Schedule Consultation, Request Assessment, Talk to Expert
// All funnel into ContactLead with different types

const contactLeadSchema = new mongoose.Schema(
  {
    // Lead info
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email"],
    },
    phone: String,
    company: String,
    jobTitle: String,

    // Which CTA triggered this lead
    leadType: {
      type: String,
      enum: ["consultation", "assessment", "expert", "general", "contact"],
      default: "general",
    },

    // Which page/service they came from
    sourcePageType: {
      type: String,
      enum: [
        "homepage",
        "service",
        "platform",
        "solution",
        "industry",
        "resource",
        "case-study",
        "contact",
        "other",
      ],
    },
    sourcePageId: String,
    sourcePageTitle: String,

    // What they're interested in
    interestedIn: [String],
    message: String,

    // Which Microsoft service area
    serviceArea: {
      type: String,
      enum: [
        "Microsoft 365",
        "Azure",
        "Dynamics 365",
        "Power Platform",
        "SharePoint",
        "Security",
        "Business Central",
        "Teams",
        "Not Sure",
        "Other",
      ],
    },

    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },

    // CRM pipeline status
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal", "closed", "lost"],
      default: "new",
    },

    adminNotes: String,
    assignedTo: String,

    // UTM tracking
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,

    ipAddress: String,
  },
  { timestamps: true }
);

// Index for dashboard queries
contactLeadSchema.index({ status: 1, createdAt: -1 });
contactLeadSchema.index({ email: 1 });

module.exports = mongoose.model("ContactLead", contactLeadSchema);
