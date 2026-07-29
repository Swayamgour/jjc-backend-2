require("dotenv").config();

const connectDB = require("../config/db");
const HomeHero = require("../models/home/HomeHero");
const HomeCardSection = require("../models/home/HomeCardSection");

/* ==============================================================
   HERO  (from Home.jsx microsoftHero object)
================================================================== */

const heroData = {
  tag: "SMART SOLUTIONS. REAL IMPACT.",
  title: "Microsoft Consulting Services for Modern Business Operations",
  highlightedText: "Modern",
  description:
    "Modern businesses require secure, scalable, and intelligent technology solutions to improve efficiency and stay competitive. JJC Systems delivers Microsoft Consulting Services that help organizations modernize operations, enhance productivity, strengthen cybersecurity, and accelerate digital transformation.",
  primaryButtonText: "Schedule a Microsoft Consultation",
  primaryButtonLink: "/contact",
  secondaryButtonText: "Explore Microsoft Services",
  secondaryButtonLink: "/services",
  partners: [
    { icon: "M365", title: "Microsoft 365", order: 0 },
    { icon: "Azure", title: "Azure", order: 1 },
    { icon: "Dynamics", title: "Dynamics 365", order: 2 },
  ],
  floatingCards: [],
  isPublished: true,
};

/* ==============================================================
   CARD SECTIONS
   (Sections whose card items weren't included in the shared
   component files are seeded with header text only + an empty
   items array — add cards for them via the CRUD endpoints,
   e.g. POST /api/home-content/sections/businessServices/items)
================================================================== */

const cardSections = [

  // WhyChooseUs.jsx
  {
    sectionKey: "whyChooseUs",
    tag: "WHY US",
    title: "Why Choose JJC Systems for Microsoft Consulting?",
    description:
      "Businesses often face challenges such as disconnected systems, inefficient workflows, limited data visibility, and increasing security risks. JJC Systems provides strategic Microsoft Consulting Services that connect technology with business objectives.",
    outro:
      "Our Microsoft consulting experts combine technical knowledge with industry experience to deliver solutions that support long-term growth.",
    items: [
      { icon: "FaUsers", title: "Improving workplace productivity", order: 0 },
      { icon: "FaCogs", title: "Simplifying business processes", order: 1 },
      { icon: "FaShieldAlt", title: "Strengthening data security", order: 2 },
      { icon: "FaChartLine", title: "Enabling smarter decision-making", order: 3 },
      { icon: "FaServer", title: "Creating scalable technology environments", order: 4 },
    ],
  },

  // BusinessServices.jsx
  {
    sectionKey: "businessServices",
    tag: "BUSINESS OUTCOMES",
    title: "Services That Drive Business Growth",
    items: [],
  },

  // DetailedServices.jsx
  {
    sectionKey: "detailedServices",
    tag: "",
    title: "",
    items: [],
  },

  // Challenges.jsx
  {
    sectionKey: "challenges",
    tag: "BUSINESS CHALLENGES WE SOLVE",
    title: "Turning Technology Challenges into Business Opportunities",
    description:
      "Every organization faces technology challenges while growing. However, the right Microsoft solutions can simplify operations, improve productivity, and create better business outcomes.",
    items: [],
  },

  // SolutionAreas.jsx
  {
    sectionKey: "solutionAreas",
    tag: "OUR SOLUTION AREAS",
    title: "Solutions That Drive Real Business Outcomes",
    items: [],
  },

  // Benefits.jsx
  {
    sectionKey: "benefits",
    tag: "BENEFITS",
    title: "Microsoft Consulting Services Benefits",
    description:
      "Partnering with JJC Systems helps organizations achieve long-term value, not just short-term technology improvements.",
    items: [],
  },

  // ClientLogos.jsx
  {
    sectionKey: "clientLogos",
    tag: "TRUSTED BY INDUSTRY LEADERS",
    items: [],
  },

  // LeadershipTeam.jsx
  {
    sectionKey: "leadershipTeam",
    tag: "OUR LEADERSHIP TEAM",
    items: [],
  },

  // Services.jsx ("Your Useful Platform")
  {
    sectionKey: "platformCards",
    tag: "PLATFORM",
    title: "Your Useful Platform",
    items: [],
  },

  // WhyJJCPartner.jsx
  {
    sectionKey: "whyJJCPartner",
    title: "Why JJC Systems is Your Microsoft Consulting Partner",
    description:
      "JJC Systems combines Microsoft technology expertise with business-focused consulting to help organizations achieve digital transformation. Our team understands that every business requires a unique technology approach. Therefore, we deliver customized Microsoft solutions that improve efficiency, security, and scalability.",
    outro:
      "With expertise across Microsoft 365, Azure, Dynamics 365, Power Platform, Business Central, SharePoint, Power BI, and security solutions, we help businesses maximize their technology investments.",
    items: [],
  },

  // CTASection.jsx
  {
    sectionKey: "cta",
    title: "Ready to Transform Your Business with Microsoft Solutions?",
    description: "Let's build the future together.",
    primaryLabel: "Schedule Consultation",
    secondaryLabel: "Request Assessment",
    items: [],
  },

  // DeliveryProcess.jsx  (items = the 4 timeline steps)
  {
    sectionKey: "deliveryProcess",
    tag: "INDUSTRIES WE SERVE",
    title: "Microsoft Consulting Process",
    description:
      "We follow a structured process to deliver reliable Microsoft solutions.",
    items: [
      {
        title: "Business Assessment",
        description:
          "First, we analyze your current technology environment, business objectives, and operational challenges.",
        order: 0,
      },
      {
        title: "Solution Planning",
        description:
          "Next, our Microsoft consultants create a strategy aligned with your business goals.",
        order: 1,
      },
      {
        title: "Implementation",
        description:
          "Then, we deploy Microsoft solutions using proven methodologies and best practices.",
        order: 2,
      },
      {
        title: "Optimization & Support",
        description:
          "Finally, we continuously improve your Microsoft environment to ensure long-term success.",
        order: 3,
      },
    ],
  },

];


const seedHomeContent = async () => {

  try {

    await connectDB();

    console.log("🌱 Home content seeding started");

    await HomeHero.deleteMany({});
    await HomeHero.create(heroData);
    console.log("✅ Hero seeded");

    await HomeCardSection.deleteMany({});
    const data = await HomeCardSection.insertMany(cardSections);
    console.log(`✅ ${data.length} home sections seeded`);

    console.log(
      "ℹ️  Some sections (businessServices, detailedServices, solutionAreas, challenges, benefits, clientLogos, leadershipTeam, platformCards) were seeded with header text only. Add their cards via:"
    );
    console.log(
      "   POST /api/home-content/sections/:key/items"
    );

    process.exit();

  } catch (error) {

    console.log("❌ Seed Error", error);
    process.exit(1);

  }

};

seedHomeContent();
