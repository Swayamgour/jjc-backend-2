require("dotenv").config();

const connectDB = require("../config/db");
const Category = require("../models/Category");

const categories = [
  // ---------------------------------------------------------------------
  // SERVICES
  // ---------------------------------------------------------------------
  {
    name: "Services",
    slug: "services",
    order: 1,
    isPublished: true,

    subcategories: [
      {
        name: "Strategy & Transformation",
        slug: "strategy-transformation",
        icon: "Compass",
        order: 1,
        items: [
          {
            name: "IT Strategy & Consulting",
            slug: "it-strategy-consulting",
            icon: "Lightbulb",
            description:
              "Align your technology roadmap with business goals through expert advisory and planning.",
            order: 1,
          },
          {
            name: "AI Readiness & Copilot Enablement",
            slug: "ai-readiness-copilot-enablement",
            icon: "Sparkles",
            description:
              "Assess, prepare, and roll out Microsoft Copilot and AI tools across your organization.",
            order: 2,
          },
          {
            name: "Microsoft Licensing & Optimization",
            slug: "microsoft-licensing-optimization",
            icon: "FileCheck2",
            description:
              "Right-size and optimize your Microsoft licensing spend across the stack.",
            order: 3,
          },
          {
            name: "Organizational Change Management",
            slug: "organizational-change-management",
            icon: "RefreshCw",
            description:
              "Drive adoption and manage the people side of technology-led change.",
            order: 4,
          },
          {
            name: "Enterprise Modernization",
            slug: "enterprise-modernization",
            icon: "TrendingUp",
            description:
              "Modernize legacy systems and processes for scalability and long-term growth.",
            order: 5,
          },
        ],
      },

      {
        name: "Managed IT & Security",
        slug: "managed-it-security",
        icon: "Shield",
        order: 2,
        items: [
          {
            name: "Managed IT",
            slug: "managed-it",
            icon: "ServerCog",
            description:
              "Proactive, fully managed IT support and infrastructure monitoring.",
            order: 1,
          },
          {
            name: "Cybersecurity, Identity & Compliance",
            slug: "cybersecurity-identity-compliance",
            icon: "ShieldCheck",
            description:
              "Protect your organization with identity management, threat defense, and compliance controls.",
            order: 2,
          },
          {
            name: "Cloud Infrastructure",
            slug: "cloud-infrastructure",
            icon: "Cloud",
            description:
              "Design, migrate, and manage secure, scalable cloud infrastructure.",
            order: 3,
          },
          {
            name: "Data Center Hosting",
            slug: "data-center-hosting",
            icon: "Database",
            description:
              "Reliable, secure hosting solutions for your critical business systems.",
            order: 4,
          },
          {
            name: "Teams Calling & Business Voice",
            slug: "teams-calling-business-voice",
            icon: "PhoneCall",
            description:
              "Unified calling and voice solutions built on Microsoft Teams.",
            order: 5,
          },
          {
            name: "Endpoint & Device Management",
            slug: "endpoint-device-management",
            icon: "Laptop",
            description:
              "Secure and manage devices across your organization from a single console.",
            order: 6,
          },
        ],
      },

      {
        name: "Business Applications",
        slug: "business-applications",
        icon: "LayoutGrid",
        order: 3,
        items: [
          {
            name: "Enterprise Resource Platform",
            slug: "enterprise-resource-platform",
            icon: "Boxes",
            description:
              "Unify operations, finance, and supply chain on a single ERP platform.",
            order: 1,
          },
          {
            name: "Finance",
            slug: "finance",
            icon: "Landmark",
            description:
              "Streamline financial management, reporting, and controls.",
            order: 2,
          },
          {
            name: "Project Operations",
            slug: "project-operations",
            icon: "ClipboardList",
            description:
              "Plan, resource, and deliver projects with full operational visibility.",
            order: 3,
          },
          {
            name: "Sales & CRM",
            slug: "sales-crm",
            icon: "Handshake",
            description:
              "Manage the full sales pipeline and customer relationships in one place.",
            order: 4,
          },
          {
            name: "Customer Service",
            slug: "customer-service",
            icon: "Headset",
            description:
              "Deliver consistent, efficient support across every customer touchpoint.",
            order: 5,
          },
          {
            name: "Contact Center",
            slug: "contact-center",
            icon: "Phone",
            description:
              "Modern, omnichannel contact center capabilities for customer engagement.",
            order: 6,
          },
          {
            name: "Field Service",
            slug: "field-service",
            icon: "Wrench",
            description:
              "Schedule, dispatch, and manage field technicians and service operations.",
            order: 7,
          },
          {
            name: "Customer Insights",
            slug: "customer-insights",
            icon: "LineChart",
            description:
              "Unify customer data to power personalized engagement and analytics.",
            order: 8,
          },
        ],
      },

      {
        name: "Data, AI & Integration",
        slug: "data-ai-integration",
        icon: "BarChart3",
        order: 4,
        items: [
          {
            name: "Business Intelligence & Reporting",
            slug: "business-intelligence-reporting",
            icon: "PieChart",
            description:
              "Turn raw data into actionable dashboards and reports for decision-making.",
            order: 1,
          },
          {
            name: "Enterprise System Integration",
            slug: "enterprise-system-integration",
            icon: "Workflow",
            description:
              "Connect disparate systems and data sources into one seamless workflow.",
            order: 2,
          },
        ],
      },

      {
        name: "Modern Work & Automation",
        slug: "modern-work-automation",
        icon: "Monitor",
        order: 5,
        items: [
          {
            name: "Modern Workplace",
            slug: "modern-workplace",
            icon: "LayoutDashboard",
            description:
              "Enable secure, flexible, and collaborative work with Microsoft 365 tools.",
            order: 1,
          },
          {
            name: "Intranet Portals & Document Management",
            slug: "intranet-portals-document-management",
            icon: "FolderKanban",
            description:
              "Centralize company content and knowledge with organized intranet portals.",
            order: 2,
          },
          {
            name: "Business Process Automation",
            slug: "business-process-automation",
            icon: "Bot",
            description:
              "Automate repetitive tasks and workflows to boost efficiency.",
            order: 3,
          },
        ],
      },

      {
        name: "Talent",
        slug: "talent",
        icon: "Users",
        order: 6,
        items: [
          {
            name: "IT Staffing",
            slug: "it-staffing",
            icon: "UserPlus",
            description:
              "Access skilled IT talent to support and scale your technology initiatives.",
            order: 1,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // INDUSTRIES
  // ---------------------------------------------------------------------
  {
    name: "Industries",
    slug: "industries",
    order: 2,
    isPublished: true,

    subcategories: [
      {
        name: "Regulated Industries",
        slug: "regulated-industries",
        icon: "ShieldCheck",
        order: 1,
        items: [
          {
            name: "Healthcare",
            slug: "healthcare",
            icon: "HeartPulse",
            description:
              "Technology solutions built for compliance, care delivery, and patient outcomes.",
            order: 1,
          },
          {
            name: "Legal",
            slug: "legal",
            icon: "Scale",
            description:
              "Secure, efficient systems tailored to legal practice and case management.",
            order: 2,
          },
          {
            name: "Financial Services",
            slug: "financial-services",
            icon: "Landmark",
            description:
              "Solutions designed for compliance, security, and operational efficiency in finance.",
            order: 3,
          },
          {
            name: "Public Sector",
            slug: "public-sector",
            icon: "Building2",
            description:
              "Technology built to meet the unique needs of government and public agencies.",
            order: 4,
          },
          {
            name: "Education",
            slug: "education",
            icon: "GraduationCap",
            description:
              "Modern IT solutions supporting institutions, staff, and students.",
            order: 5,
          },
        ],
      },

      {
        name: "Commercial Industries",
        slug: "commercial-industries",
        icon: "Factory",
        order: 2,
        items: [
          {
            name: "Manufacturing",
            slug: "manufacturing",
            icon: "Cog",
            description:
              "Optimize production, supply chain, and operations with integrated technology.",
            order: 1,
          },
          {
            name: "Retail & Distribution",
            slug: "retail-distribution",
            icon: "ShoppingCart",
            description:
              "Streamline inventory, sales, and distribution across every channel.",
            order: 2,
          },
          {
            name: "Construction & Field Services",
            slug: "construction-field-services",
            icon: "HardHat",
            description:
              "Manage projects, crews, and field operations with connected tools.",
            order: 3,
          },
          {
            name: "Professional Services",
            slug: "professional-services",
            icon: "Briefcase",
            description:
              "Improve resourcing, billing, and delivery for service-based businesses.",
            order: 4,
          },
        ],
      },

      {
        name: "Growth & Community Organizations",
        slug: "growth-community-organizations",
        icon: "UsersRound",
        order: 3,
        items: [
          {
            name: "Small & Mid-Market Enterprises",
            slug: "small-mid-market-enterprises",
            icon: "Building",
            description:
              "Right-sized technology solutions that scale as growing businesses expand.",
            order: 1,
          },
          {
            name: "Nonprofits & Associations",
            slug: "nonprofits-associations",
            icon: "HandHeart",
            description:
              "Affordable, mission-driven technology support for nonprofits and associations.",
            order: 2,
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------
  // PLATFORMS
  // ---------------------------------------------------------------------
  {
    name: "Platforms",
    slug: "platforms",
    order: 3,
    isPublished: true,

    subcategories: [
      {
        name: "Microsoft 365 & Modern Work",
        slug: "microsoft-365-modern-work",
        icon: "LayoutGrid",
        order: 1,
        items: [
          {
            name: "Microsoft 365",
            slug: "microsoft-365",
            icon: "AppWindow",
            description:
              "The core productivity and collaboration suite for modern organizations.",
            order: 1,
          },
          {
            name: "Microsoft Copilot",
            slug: "microsoft-copilot",
            icon: "Sparkles",
            description:
              "AI-powered assistance embedded across Microsoft apps to boost productivity.",
            order: 2,
          },
          {
            name: "Microsoft Intune",
            slug: "microsoft-intune",
            icon: "Smartphone",
            description:
              "Unified endpoint management for devices across your organization.",
            order: 3,
          },
          {
            name: "Microsoft Purview",
            slug: "microsoft-purview",
            icon: "SearchCheck",
            description:
              "Govern, protect, and manage your organization's data estate.",
            order: 4,
          },
        ],
      },

      {
        name: "Dynamics 365",
        slug: "dynamics-365",
        icon: "Layers",
        order: 2,
        items: [
          {
            name: "Dynamics 365 Business Central",
            slug: "dynamics-365-business-central",
            icon: "BriefcaseBusiness",
            description:
              "All-in-one business management solution for small and mid-sized companies.",
            order: 1,
          },
          {
            name: "Dynamics 365 Finance",
            slug: "dynamics-365-finance",
            icon: "Landmark",
            description:
              "Financial management and forecasting for growing enterprises.",
            order: 2,
          },
          {
            name: "Dynamics 365 Sales",
            slug: "dynamics-365-sales",
            icon: "Handshake",
            description:
              "Sales pipeline and relationship management built for growth.",
            order: 3,
          },
          {
            name: "Dynamics 365 Customer Service",
            slug: "dynamics-365-customer-service",
            icon: "Headset",
            description:
              "Deliver connected, personalized customer support experiences.",
            order: 4,
          },
          {
            name: "Dynamics 365 Field Service",
            slug: "dynamics-365-field-service",
            icon: "Wrench",
            description:
              "Optimize scheduling, dispatch, and on-site service delivery.",
            order: 5,
          },
          {
            name: "Dynamics 365 Customer Insights",
            slug: "dynamics-365-customer-insights",
            icon: "LineChart",
            description:
              "Unify customer data into a single view to power personalized engagement.",
            order: 6,
          },
          {
            name: "Dynamics 365 Contact Center",
            slug: "dynamics-365-contact-center",
            icon: "Phone",
            description:
              "AI-powered omnichannel contact center for modern customer engagement.",
            order: 7,
          },
          {
            name: "Dynamics 365 Project Operations",
            slug: "dynamics-365-project-operations",
            icon: "ClipboardList",
            description:
              "Connect sales, resourcing, project management, and finance teams.",
            order: 8,
          },
        ],
      },

      {
        name: "Data, AI & Automation",
        slug: "data-ai-automation",
        icon: "BarChart3",
        order: 3,
        items: [
          {
            name: "Microsoft Power Platform",
            slug: "microsoft-power-platform",
            icon: "Zap",
            description:
              "Build apps, automate workflows, and analyze data with low-code tools.",
            order: 1,
          },
          {
            name: "Microsoft Fabric",
            slug: "microsoft-fabric",
            icon: "Database",
            description:
              "Unified analytics platform bringing data engineering and BI together.",
            order: 2,
          },
        ],
      },

      {
        name: "Cloud, Security & Infrastructure",
        slug: "cloud-security-infrastructure",
        icon: "Cloud",
        order: 4,
        items: [
          {
            name: "Microsoft Azure Cloud",
            slug: "microsoft-azure-cloud",
            icon: "CloudCog",
            description:
              "Scalable, secure cloud infrastructure and services for any workload.",
            order: 1,
          },
          {
            name: "Microsoft Azure Virtual Desktop",
            slug: "microsoft-azure-virtual-desktop",
            icon: "MonitorSmartphone",
            description:
              "Deliver secure, virtualized desktops accessible from anywhere.",
            order: 2,
          },
          {
            name: "Microsoft Defender",
            slug: "microsoft-defender",
            icon: "ShieldAlert",
            description:
              "Unified threat protection across endpoints, identities, and cloud apps.",
            order: 3,
          },
        ],
      },
    ],
  },
];

// ---------------------------------------------------------------------
// SEED
// ---------------------------------------------------------------------

const seedCategory = async () => {
  try {
    await connectDB();

    console.log("🌱 Category seeding started");

    await Category.deleteMany({});

    const data = await Category.insertMany(categories);

    console.log(`✅ ${data.length} Categories added`);

    process.exit();
  } catch (error) {
    console.log("❌ Seed Error", error);

    process.exit(1);
  }
};

seedCategory();