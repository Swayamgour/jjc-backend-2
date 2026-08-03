const mongoose = require("mongoose");

const contactLeadSchema = new mongoose.Schema(
  {
    // Lead info - matches frontend field names
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email"],
    },
    phone: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: false,
    },

    // Form selection fields
    leadType: {
      type: String,
      enum: ["consultation", "assessment", "expert", "general"],
      default: "general",
    },
    interestedIn: {
      type: String, // Single string from frontend dropdown
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

    // Company size - must match the exact `value` attributes sent by the frontend <select>
    companySize: {
      type: String,
      enum: [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1000+",
      ],
      required: false,
    },

    // Microsoft service area
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
      required: false,
    },

    // Page tracking
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
      default: "contact",
    },
    sourcePageId: String,
    sourcePageTitle: {
      type: String,
      default: "Contact Us",
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

    // Spam protection
    ipAddress: String,

    // Consent
    consent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes for performance
contactLeadSchema.index({ status: 1, createdAt: -1 });
contactLeadSchema.index({ email: 1 });
contactLeadSchema.index({ createdAt: -1 });

module.exports = mongoose.model("ContactLead", contactLeadSchema);