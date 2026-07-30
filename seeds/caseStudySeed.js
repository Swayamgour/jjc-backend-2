/**
 * Run with: node seed/caseStudySeed.js
 * Requires MONGO_URI in your environment (same as the main app).
 * Reproduces the Healthcare industry page + the "Twenty million records"
 * story exactly as they appear in the current static JSX, so you can
 * point the frontend at the API immediately and see identical output.
 */
require("dotenv").config();
const mongoose = require("mongoose");
const CaseStudyCategory = require("../models/CaseStudyCategory");
const CaseStudy = require("../models/CaseStudy");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected. Seeding Healthcare case studies...");

  await CaseStudyCategory.deleteOne({ slug: "healthcare", type: "industry" });
  const healthcare = await CaseStudyCategory.create({
    name: "Healthcare",
    slug: "healthcare",
    type: "industry",
    icon: "heart-pulse",
    order: 1,
    heroEyebrow: "Client Success · Industry",
    heroHeading: "What good looks like in Healthcare",
    heroLede:
      "Coordination, compliance and the administrative load that keeps clinicians from patients. These are outcomes published for provider and payer organizations.",
    glanceHeading: "Where these come from",
    glanceItems: [
      { icon: "i-check", text: "Every outcome is sourced from a Microsoft-published case study." },
      { icon: "i-check", text: "Organization names are withheld; the published figures are unchanged." },
      { icon: "i-check", text: "These are reference outcomes, not JJC Systems client results." },
      { icon: "i-check", text: "The full source list with URLs is available on request." },
    ],
    extraStats: [
      { value: "Microsoft", label: "Published case studies" },
      { value: "Anonymized", label: "By client request" },
      { value: "1 day", label: "We reply to every enquiry" },
    ],
    listHeading: "Four outcomes in Healthcare",
    listLede:
      "Coordination, compliance and the administrative load that keeps clinicians from patients. These are outcomes published for provider and payer organizations.",
  });

  await CaseStudy.deleteMany({ parent: healthcare._id });

  await CaseStudy.create([
    {
      title: "Patient outreach that people actually respond to",
      slug: "story-patient-outreach-that-people-actually-respond-to",
      description:
        "Communication delays and fragmented patient data were limiting access to care.",
      sourceType: "industry",
      parent: healthcare._id,
      industryTag: "Healthcare",
      capabilityTag: "Business Applications",
      org: { name: "A multi-site regional health system", region: "United States" },
      heroEyebrow: "Healthcare · Business Applications",
      heroLede:
        "Communication delays and fragmented patient data were limiting access to care. Outreach was generic, arrived late, and the organization could not tell which channels were working.",
      heroStats: [
        { value: "87%", label: "Patient response rate" },
        { value: "$8M+", label: "Projected system-wide savings" },
        { value: "1", label: "Unified patient data view" },
      ],
      glanceItems: [
        { text: "Sector: Healthcare" },
        { text: "Capability: Business Applications" },
        { text: "Region: United States" },
        { text: "Organization name withheld — see sourcing note below" },
        { text: "Figures reproduced as published, unchanged" },
      ],
      situation: {
        intro:
          "Communication delays and fragmented patient data were limiting access to care. Outreach was generic, arrived late, and the organization could not tell which channels were working.",
        body:
          "Communication delays and fragmented patient data were limiting access to care. Outreach was generic, arrived late, and the organization could not tell which channels were working.",
      },
      approachText: {
        intro:
          "Patient engagement was rebuilt on Dynamics 365 Customer Insights with Microsoft Cloud for Healthcare unifying the underlying data, so outreach could be personalised by behaviour and channel preference rather than sent in batches.",
        body:
          "Patient engagement was rebuilt on Dynamics 365 Customer Insights with Microsoft Cloud for Healthcare unifying the underlying data, so outreach could be personalised by behaviour and channel preference rather than sent in batches.",
      },
      resultsHeading: "What was published",
      resultsLede: "These are the figures exactly as reported in the source. Nothing has been rounded, extrapolated or restated.",
      outcomes: [
        "Personalised outreach across screening, lab follow-up and preventive care reminders",
        "Diagnostic revenue increased through improved follow-through on recommended tests",
        "Message fatigue reduced by adapting to individual channel preferences",
        "Programme extended to further regions and service lines after early results",
      ],
      products: ["Dynamics 365 Customer Insights", "Microsoft Cloud for Healthcare"],
      platforms: [
        {
          appTag: "Dynamics 365",
          name: "Customer Insights",
          desc: "Unifies patient data and drives personalised, behaviour-based outreach.",
        },
        {
          appTag: "Industry Cloud",
          name: "Microsoft Cloud for Healthcare",
          desc: "Provides the underlying healthcare data model the engagement was built on.",
        },
      ],
      transfers: {
        intro:
          "Any healthcare organization sending generic, batch-scheduled outreach has a version of this problem and usually has not measured what it costs in no-shows and missed follow-through.",
        noteBody:
          "Personalisation at this scale only works if the underlying patient data is actually unified first — the messaging layer is the easy part.",
        steps: [
          { title: "Check what you already own", desc: "Most organizations are licensed for more than they have deployed." },
          { title: "Assess permissions before AI", desc: "Copilot reaches whatever the user can reach." },
          { title: "Pick scenarios with the business", desc: "The functions that will use it know where their week goes." },
          { title: "Measure in tiers", desc: "Usage, then time and quality, then business KPIs." },
        ],
      },
      sourcing: {
        paragraphs: [
          "This report is drawn from a case study published by Microsoft about one of its own customers. It is a reference outcome — evidence of what these platforms have delivered elsewhere. It is not a JJC Systems client engagement, and we do not present it as our own work.",
          "The organization's name and any identifying detail have been withheld. Named individuals, internal system names, commercial terms and anything else that could identify the customer or its suppliers have been removed. What remains is the operational situation, the approach and the published results — reproduced without alteration.",
          "We hold the full source reference, including the organization name and the URL, and will provide it on request. When our own client work is approved for publication it will appear here under the same structure, clearly marked as ours.",
        ],
        shortNote: "published by Microsoft, about its customer, not about ours. Names withheld, figures unchanged, sources available on request.",
      },
    },
    {
      title: "Twenty million records a year, processed without new headcount",
      slug: "story-twenty-million-records-a-year-processed-without-new",
      description:
        "Medical records arrived from a wide variety of providers in inconsistent formats and had to be assembled into a coherent history for each patient, for both care and billing.",
      sourceType: "industry",
      parent: healthcare._id,
      industryTag: "Healthcare",
      capabilityTag: "Modern Work & Automation",
      org: { name: "A national acute care provider group", region: "United States" },
      heroEyebrow: "Healthcare · Modern Work & Automation",
      heroLede:
        "Medical records arrived from a wide variety of providers in inconsistent formats and had to be assembled into a coherent history for each patient, for both care and billing. Volume growth meant hiring.",
      heroStats: [
        { value: "20M", label: "Records processed per year" },
        { value: "100,000+", label: "Hours of work saved annually" },
        { value: "0", label: "New hires required to scale" },
        { value: "1", label: "Microsoft products involved" },
      ],
      glanceItems: [
        { text: "Sector: Healthcare" },
        { text: "Capability: Modern Work & Automation" },
        { text: "Region: United States" },
        { text: "Organization name withheld — see sourcing note below" },
        { text: "Figures reproduced as published, unchanged" },
      ],
      situation: {
        intro:
          "Medical records arrived from a wide variety of providers in inconsistent formats and had to be assembled into a coherent history for each patient, for both care and billing. Volume growth meant hiring.",
        body:
          "Records processing is the sort of work that never appears on a strategy slide and quietly consumes a department. Medical records arrive from hundreds of providers in formats that were never standardised, and someone has to turn them into one coherent history before either a clinician or a biller can use them.",
      },
      approachText: {
        intro:
          "The DevOps team automated intake and processing with Power Automate, taking records from every source and normalising them into one patient history without manual handling.",
        body:
          "The scale here is what makes it notable: twenty million records a year is well past the point where adding staff is a viable answer, and the organization was facing exactly that decision. Automating the intake and normalisation with workflow tooling rather than a bespoke integration platform kept the solution inside the existing licensing and skill set.",
      },
      resultsHeading: "What was published",
      resultsLede: "These are the figures exactly as reported in the source. Nothing has been rounded, extrapolated or restated.",
      outcomes: [
        "Records from many provider formats normalised into one coherent patient history",
        "Care history and billing both served from the same processed record",
        "New clients and processes onboarded without adding staff",
        "Skilled people redeployed from data handling onto exception work",
      ],
      products: ["Power Automate"],
      platforms: [
        {
          appTag: "Power Platform",
          name: "Power Automate",
          desc: "Workflow and integration. Moves data between systems, routes approvals and removes the manual re-keying that rarely appears in anyone's job description.",
        },
      ],
      transfers: {
        intro:
          "Any organization ingesting high volumes of unstructured documents from many external parties — claims, applications, invoices, referrals — has a version of this problem and usually has not measured what it costs.",
        noteBody:
          "Automation at this volume makes exception handling the whole job. The design question is not what happens to the 95% that process cleanly, but who looks at the rest and how quickly they find them.",
        approachHeading: "Our approach to Modern Work & Automation work",
        steps: [
          { title: "Check what you already own", desc: "Most organizations are licensed for more than they have deployed. This step frequently reduces the engagement we were about to be paid for." },
          { title: "Assess permissions before AI", desc: "Copilot reaches whatever the user can reach. A decade of casual oversharing becomes visible on day one, and it is entirely avoidable if you look first." },
          { title: "Pick scenarios with the business", desc: "The functions that will use it know where their week goes. Scenario selection done inside IT produces pilots that impress nobody." },
          { title: "Measure in tiers", desc: "Usage, then time and quality, then business KPIs. Anyone promising the third before the first exists is guessing." },
        ],
      },
      sourcing: {
        paragraphs: [
          "This report is drawn from a case study published by Microsoft about one of its own customers. It is a reference outcome — evidence of what these platforms have delivered elsewhere. It is not a JJC Systems client engagement, and we do not present it as our own work.",
          "The organization's name and any identifying detail have been withheld. Named individuals, internal system names, commercial terms and anything else that could identify the customer or its suppliers have been removed. What remains is the operational situation, the approach and the published results — reproduced without alteration.",
          "We hold the full source reference, including the organization name and the URL, and will provide it on request. When our own client work is approved for publication it will appear here under the same structure, clearly marked as ours.",
        ],
        shortNote: "published by Microsoft, about its customer, not about ours. Names withheld, figures unchanged, sources available on request.",
      },
    },
    // ---- Gap / reserved slots ----
    {
      title: "Healthcare security and compliance modernization",
      sourceType: "industry",
      parent: healthcare._id,
      industryTag: "Healthcare",
      capabilityTag: "Managed IT & Security",
      isGap: true,
      gapNote:
        "We have not published a story in this slot yet. Microsoft has no case study covering this industry and capability combination that we could source and verify, and we would rather leave the space visibly empty than fill it with something we cannot stand behind. It will be filled by a JJC Systems engagement once a client approves the reference.",
    },
    {
      title: "Clinical and financial reporting on one governed foundation",
      sourceType: "industry",
      parent: healthcare._id,
      industryTag: "Healthcare",
      capabilityTag: "Data, AI & Integration",
      isGap: true,
      gapNote:
        "We have not published a story in this slot yet. Microsoft has no case study covering this industry and capability combination that we could source and verify, and we would rather leave the space visibly empty than fill it with something we cannot stand behind. It will be filled by a JJC Systems engagement once a client approves the reference.",
    },
  ]);

  console.log("Seed complete.");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
