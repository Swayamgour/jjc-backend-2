// seed/homePageSeed.js
// Run: node seed/homePageSeed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import HomePage from "../models/HomePage.js";

dotenv.config();

const homePageData = {
  singletonKey: "home",

  seo: {
    title: "JJC Systems — Microsoft Consulting, Managed IT & Business Applications",
    description:
      "JJC Systems is a one-stop technology partner for Microsoft consulting and adoption — Dynamics 365, Azure and Microsoft 365 — plus managed IT, security and custom business solutions built on the tools your teams already use.",
  },

  /* ---------------- Hero ---------------- */
  heroSlides: [
    {
      eyebrow: "AI Readiness & ROI",
      title: "Feeling overwhelmed by the new AI wave?",
      description:
        "We help you evaluate where Microsoft Copilot and agentic AI genuinely pay off, cut through the uncertainty, and build a practical roadmap you can act on.",
      ctaText: "Get your free AI ROI assessment",
      ctaLink: "#contact",
      image: "/assets/img/hero-1.jpg",
      imageAlt: "Microsoft Copilot, agentic AI, governance and ROI roadmap concept",
      order: 1,
    },
    {
      eyebrow: "What We Do",
      title: "Technology consulting aligned to the way business works",
      description:
        "We start with your applications and your goals, not a product catalogue — with full vendor transparency and deep Microsoft Dynamics 365 expertise when that's the right fit.",
      ctaText: "Explore our services",
      ctaLink: "#services",
      image: "/assets/img/hero-2.jpg",
      imageAlt:
        "Consulting approach from discover to optimise across the Microsoft application ecosystem",
      order: 2,
    },
    {
      eyebrow: "Customer Stories",
      title: "Helping clients across industries achieve real results",
      description:
        "Practical technology that improves how organizations operate, collaborate, see their data and grow — measured in outcomes, not deliverables.",
      ctaText: "Explore success stories",
      ctaLink: "#success-stories",
      image: "/assets/img/hero-3.jpg",
      imageAlt: "Client outcomes across healthcare, manufacturing, financial services and retail",
      order: 3,
    },
    {
      eyebrow: "Custom Solutions",
      title: "Custom solutions built inside the tools your teams already use",
      description:
        "Industry- and business-focused solutions delivered through Microsoft 365, Office and Dynamics Business Applications — so your people work smarter without changing how they work.",
      ctaText: "Request your custom demo",
      ctaLink: "#solutions",
      image: "/assets/img/hero-4.jpg",
      imageAlt:
        "Custom solutions running inside Microsoft 365, Dynamics 365, Power Automate and Power BI",
      order: 4,
    },
    {
      eyebrow: "Client Testimonials",
      title: "See what our clients have to say",
      description:
        "Clients stay with us for the quality of the work, the speed of our response, and technology that improves both the daily grind and the long-term picture.",
      ctaText: "Read client testimonials",
      ctaLink: "#testimonials",
      image: "/assets/img/hero-5.jpg",
      imageAlt: "Client testimonials from IT and operations leaders",
      order: 5,
    },
  ],

  /* ---------------- Why Us ---------------- */
  whyIntro: {
    eyebrow: "Why JJC Systems",
    heading:
      "We are the single partner behind everything Microsoft in your business — Dynamics 365, Azure and Microsoft 365 — and behind the wider technology your people depend on every day.",
  },
  whyCards: [
    {
      icon: "i-users",
      title: "Large enough to serve, small enough to care",
      description:
        "You get the capability of a large consultancy with the responsiveness of a team that knows your name and picks up the phone.",
      order: 1,
    },
    {
      icon: "i-globe",
      title: "A global team, working 24/7",
      description:
        "Work moves with the clock. An issue raised at the end of your day is often resolved before the start of your next one.",
      order: 2,
    },
    {
      icon: "i-strategy",
      title: "A strategic partnership, not a transaction",
      description:
        "We plan around your roadmap, budget cycles and business goals — not around a ticket queue or a quota.",
      order: 3,
    },
    {
      icon: "i-target",
      title: "The outcome comes before the technology",
      description:
        "We start with the result you are trying to reach, then choose the tools that get you there. Never the other way around.",
      order: 4,
    },
    {
      icon: "i-erp",
      title: "Solutions and services under one roof",
      description:
        "Strategy, build, migration, integration, managed services and staffing from one team — so nothing falls through the gaps between vendors.",
      order: 5,
    },
    {
      icon: "i-award",
      title: "Certified consultants on every engagement",
      description:
        "Microsoft-certified professionals, paired with industry specialists who have already solved this problem in your sector.",
      order: 6,
    },
  ],

  partnerVisual: {
    heading: "One team. One point of contact.",
    bullets: ["Applications", "Infrastructure", "Security & Monitoring", "Adoption & Procurement"],
  },
  partnerRows: [
    {
      icon: "i-grid",
      tag: "For large organizations",
      title: "One Partner for Your Entire Microsoft Environment",
      description:
        "Large organizations come to us so Dynamics 365, Microsoft Azure and Microsoft 365 are looked after together instead of being split across a different supplier for each. When Microsoft releases an update or a new security weakness comes to light, our engineers are already working on it. Nobody on your team has to watch for the announcement, judge whether it matters, or drop everything to react.",
      order: 1,
    },
    {
      icon: "i-cloud",
      tag: "For small & mid-size organizations",
      title: "A Complete IT Function, Without Building One Yourself",
      description:
        "Smaller and growing organizations use us as their whole technology team. We begin with what your business actually does day to day, then choose the tools to fit — the applications your people work in, the cloud or on-site systems behind them, security, round-the-clock monitoring, training, and the right licenses at the right price. One partner, one relationship, one bill.",
      order: 2,
    },
    {
      icon: "i-automation",
      tag: "Value add",
      title: "Ready-Made Solutions, Built on Tools Your Team Already Knows",
      description:
        "We have built a library of solutions for specific industries on top of Microsoft Office and Dynamics — the software your people already open every morning. That means far less to learn, far less to set up, and a much shorter wait before something is working. Every rollout includes full adoption training, so the return starts on day one rather than a year later.",
      order: 3,
    },
  ],

  /* ---------------- Benefits ---------------- */
  benefitsIntro: {
    eyebrow: "What You Get",
    heading: "The difference shows up in your day-to-day.",
    lede: "Five things our clients tell us changed once we started working together.",
  },
  benefits: [
    { title: "Peace of mind", description: "Technology changes every week. Keeping up with it is our job, not yours.", order: 1 },
    { title: "The skills your team doesn't have", description: "Specialist expertise on demand, for exactly as long as you need it — and no longer.", order: 2 },
    { title: "Extra hands for your projects", description: "Scale delivery capacity up or down without hiring, onboarding or long-term headcount.", order: 3 },
    { title: "Fixed, predictable project costs", description: "Implementation, migration, integration and support quoted up front. No open-ended meter.", order: 4 },
    { title: "ROI and adoption you can measure", description: "A system nobody uses isn't a solution. We measure success by how many people actually use what we build.", order: 5 },
  ],

  /* ---------------- Solutions ---------------- */
  solutionsIntro: {
    eyebrow: "Custom Solutions",
    heading: "Built on Dynamics 365. Measured in business outcomes.",
    lede:
      "Our solutions run inside Microsoft Dynamics 365 Business Applications and the Office tools your teams already use every day. There's no new system to learn and no separate login to remember — which is why adoption stops being a change programme and starts being a Tuesday.",
  },
  solutionCards: [
    { icon: "i-service", tag: "Healthcare", title: "Patient & Referral Coordination", description: "Track referrals, hand-offs and follow-ups in one place, with the audit trail your compliance team expects and none of the spreadsheets they currently chase.", order: 1 },
    { icon: "i-docs", tag: "Legal", title: "Matter & Client Intake", description: "Intake, conflict checks, matter tracking and time capture — connected to Outlook and SharePoint, so nothing lives only in someone's inbox.", order: 2 },
    { icon: "i-field", tag: "Construction & Field Services", title: "Job Costing & Field Operations", description: "Estimates, change orders, crew scheduling and job profitability visible from the office and the site — including when the site has no signal.", order: 3 },
    { icon: "i-erp", tag: "Retail & Distribution", title: "Order-to-Cash Visibility", description: "One view of orders, stock and fulfilment from quote through to cash collected, so finance and operations stop reconciling two versions of the truth.", order: 4 },
    { icon: "i-project", tag: "Professional Services", title: "Project Delivery & Utilization", description: "Pipeline, resourcing, timesheets and margin in a single system that delivery leads and the finance team both trust.", order: 5 },
    { icon: "i-target", tag: "Nonprofits & Associations", title: "Donor, Member & Program Management", description: "Donors, members, grants and programmes managed together, without stitching five disconnected tools into a reporting nightmare each quarter.", order: 6 },
  ],
  solutionProcess: [
    { number: 1, title: "Discover", description: "We learn how your business actually runs today, including the workarounds." },
    { number: 2, title: "Align", description: "We agree the business outcomes and what success will be measured against." },
    { number: 3, title: "Design", description: "We map the solution to your process, then show it to you before we build." },
    { number: 4, title: "Implement", description: "We build, migrate, integrate and train — to a fixed price and a fixed date." },
    { number: 5, title: "Optimize", description: "We stay on to tune what's live and add the next thing when you're ready." },
  ],
  solutionsFooter: {
    title: "Every solution ships complete.",
    text: "Fixed-price implementation, data migration from your current systems, integration with the tools you're keeping, and adoption training for every user — not just the project team.",
    ctaText: "Explore all custom solutions",
    ctaLink: "#contact",
  },

  /* ---------------- Platforms ---------------- */
  platformsIntro: {
    eyebrow: "Platforms",
    heading: "One connected Microsoft ecosystem",
    summary:
      "We help organizations select, implement and support the platforms that power modern work, business operations, data and cloud infrastructure — with one accountable team across the entire environment.",
  },
  platformsFooter: {
    title: "Not sure where to begin?",
    text: "We map the right platform to your business priorities before recommending a solution.",
    ctaText: "Discuss your platform roadmap",
    ctaLink: "#contact",
  },

  /* ---------------- Services ---------------- */
  servicesIntro: {
    eyebrow: "What We Do",
    heading: "Six service areas. Every capability your technology function needs.",
    lede:
      "Each category brings related services together under one accountable delivery team. Open a category to see the full scope, the business problem each service solves, and the specialists assigned to the work.",
  },
  serviceFamilies: [
    {
      icon: "i-strategy",
      title: "Strategy & Transformation",
      capabilities: 5,
      summary: "Roadmaps, AI readiness, licensing, organizational change and enterprise modernization.",
      team: "Solution architects · Industry advisors · Business analysts · AI consultants · Change and adoption specialists",
      order: 1,
      services: [
        { title: "IT Strategy & Consulting", link: "/services/it-strategy-consulting", description: "A solution architect translates the business outcomes you want into the technology best suited to reach them — backed by industry experts with more than 40 years of combined experience in your sector.", team: "Solution architect · Industry advisor · Business analyst" },
        { title: "AI Readiness & Copilot Enablement", link: "/services/ai-readiness-copilot-enablement", description: "A team that stays on top of Copilot implementation and support. We help you work out what you need to make it succeed — before, during and after rollout — so you know the return before you commit the budget.", team: "AI consultant · Data & security lead · Adoption specialist" },
        { title: "Microsoft Licensing & Optimization", link: "/services/microsoft-licensing-optimization", description: "Pay for what you actually use. We review your agreements, remove overlapping licences and align your subscriptions to real usage ahead of each renewal date.", team: "Licensing specialist · Procurement advisor" },
        { title: "Organizational Change Management", link: "/services/organizational-change-management", description: "Technology only pays off when people change how they work. We plan the communication, training and floor-walking support that makes a new way of working stick.", team: "Change lead · Trainer · Communications specialist" },
        { title: "Enterprise Modernization", link: "/services/enterprise-modernization", description: "Retire ageing systems on a schedule your business can absorb — without losing the data, the integrations or the hard-won process knowledge built into them.", team: "Solution architect · Migration engineer · Business analyst" },
      ],
    },
    {
      icon: "i-shield",
      title: "Managed IT & Security",
      capabilities: 6,
      summary: "Day-to-day support, cybersecurity, cloud, hosting, business voice and endpoint operations.",
      team: "Service desk · Security engineers · Cloud architects · Infrastructure, voice and endpoint specialists · Service delivery managers",
      order: 2,
      services: [
        { title: "Managed IT", link: "/services/managed-it", description: "Day-to-day support, patching and monitoring for your people, devices and servers — with response times agreed in writing and a named service manager who owns them.", team: "Service desk · Systems engineer · Service delivery manager" },
        { title: "Cybersecurity, Identity & Compliance", link: "/services/cybersecurity-identity-compliance", description: "Protect your organization with identity management, threat defense and compliance controls — and the evidence trail auditors and insurers ask for.", team: "Security engineer · Identity specialist · Compliance analyst" },
        { title: "Cloud Infrastructure", link: "/services/cloud-infrastructure", description: "Design, migrate and manage secure, scalable cloud infrastructure — with the running costs modelled before you move, not discovered on the first invoice.", team: "Cloud architect · Migration engineer · Cost analyst" },
        { title: "Data Center Hosting", link: "/services/data-center-hosting", description: "Reliable, secure hosting for the critical business systems that aren't moving to public cloud yet — private, hybrid or a mix of both.", team: "Infrastructure engineer · Network specialist · Monitoring desk" },
        { title: "Teams Calling & Business Voice", link: "/services/teams-calling-business-voice", description: "Move your phone system into Microsoft Teams so calls, meetings and chat live in one place, on any device, on one bill.", team: "Voice engineer · Telecom project manager" },
        { title: "Endpoint & Device Management", link: "/services/endpoint-device-management", description: "Enrol, secure and update every laptop, desktop and phone from one console — including getting a new starter fully set up before their first morning.", team: "Endpoint engineer · Security analyst" },
      ],
    },
    {
      icon: "i-erp",
      title: "Business Applications",
      capabilities: 8,
      summary: "ERP, finance, project operations, CRM, customer service, contact center, field service and customer insights.",
      team: "ERP and CRM consultants · Functional specialists · Solution architects · Data migration, workflow and adoption leads",
      order: 3,
      services: [
        { title: "Enterprise Resource Platform", link: "/services/enterprise-resource-platform", description: "Run finance, operations and supply chain on one connected platform instead of separate systems that quietly disagree with each other.", team: "ERP consultant · Solution architect · Data migration lead" },
        { title: "Finance", link: "/services/finance", description: "Close the books faster with automated reconciliation, approval workflows and reporting your auditors can follow without a phone call.", team: "Finance consultant · Accounting analyst · Report developer" },
        { title: "Project Operations", link: "/services/project-operations", description: "Quote, resource, deliver and invoice projects in one system — with margin visible while there's still time to protect it.", team: "Project operations consultant · Resourcing analyst" },
        { title: "Sales & CRM", link: "/services/sales-crm", description: "Give your sales team one reliable view of every account, opportunity and next step — and give leadership a forecast they can actually believe.", team: "CRM consultant · Sales process analyst · Adoption specialist" },
        { title: "Customer Service", link: "/services/customer-service", description: "Handle cases across email, phone, chat and self-service portal with the full history, SLA clock and knowledge base in front of every agent.", team: "Service consultant · Workflow developer" },
        { title: "Contact Center", link: "/services/contact-center", description: "Route, record and measure every customer conversation, with live queue visibility and quality insight your supervisors can act on the same day.", team: "Contact center architect · Voice engineer · Reporting analyst" },
        { title: "Field Service", link: "/services/field-service", description: "Send the right technician with the right parts to the right job, and give them everything they need on site — with or without a signal.", team: "Field service consultant · Mobility specialist · Scheduling analyst" },
        { title: "Customer Insights", link: "/services/customer-insights", description: "Bring scattered customer data into one profile, then use it to time the next conversation well instead of guessing.", team: "Data consultant · Marketing technologist" },
      ],
    },
    {
      icon: "i-chart",
      title: "Data, AI & Integration",
      capabilities: 2,
      summary: "Trusted business intelligence and connected systems that eliminate duplicated work and fragmented data.",
      team: "BI developers · Data engineers · Business analysts · Integration architects · API developers",
      order: 4,
      services: [
        { title: "Business Intelligence & Reporting", link: "/services/business-intelligence-reporting", description: "Turn raw data into dashboards and reports people act on — one agreed set of numbers, refreshed automatically, that everyone in the meeting trusts.", team: "BI developer · Data engineer · Business analyst" },
        { title: "Enterprise System Integration", link: "/services/enterprise-system-integration", description: "Connect disparate systems and data sources into one seamless workflow, so information stops being re-typed from one screen into another.", team: "Integration architect · API developer · Data engineer" },
      ],
    },
    {
      icon: "i-grid",
      title: "Modern Work & Automation",
      capabilities: 3,
      summary: "Microsoft 365, intranets, document management and workflow automation for more productive work.",
      team: "Microsoft 365 and SharePoint consultants · Information architects · Security and adoption specialists · Power Platform developers",
      order: 5,
      services: [
        { title: "Modern Workplace", link: "/services/modern-workplace", description: "Enable secure, flexible and collaborative work with Microsoft 365 — properly configured, properly secured and properly explained to your people.", team: "Microsoft 365 consultant · Security engineer · Adoption specialist" },
        { title: "Intranet Portals & Document Management", link: "/services/intranet-portals-document-management", description: "One place your people can actually find things — policies, forms, projects and files — with permissions that hold up under scrutiny.", team: "SharePoint consultant · Information architect" },
        { title: "Business Process Automation", link: "/services/business-process-automation", description: "Replace the spreadsheets, email chains and manual approvals that slow your team down, using the Power Platform tools already in your licence.", team: "Power Platform developer · Process analyst" },
      ],
    },
    {
      icon: "i-staffing",
      title: "Technology Talent",
      capabilities: 1,
      summary: "Flexible access to vetted technology professionals for contract, contract-to-hire and permanent roles.",
      team: "Technical recruiters · Delivery managers · Engineers who validate technical capability",
      order: 6,
      services: [
        { title: "IT Staffing", link: "/services/it-staffing", description: "Vetted, certified technology professionals for contract, contract-to-hire or permanent roles — screened by engineers who understand the work.", team: "Technical recruiter · Delivery manager" },
      ],
    },
  ],

  /* ---------------- Clients ---------------- */
  clientsIntro: {
    eyebrow: "Clients",
    heading: "Organizations that trust us with their technology",
    lede:
      "From regulated enterprises to growing mid-market teams and nonprofits — the mix is deliberate, and it's why we understand more than one way of working.",
  },
  clientLogos: [
    { name: "Adama US", image: "https://jjcsystems.com/wp-content/uploads/2025/07/Adama-JJC-Client.png", order: 1 },
    { name: "Infleqtion", image: "https://jjcsystems.com/wp-content/uploads/2025/06/JJC-Client-Infleqtion.png", order: 2 },
    { name: "Sharps", image: "https://jjcsystems.com/wp-content/uploads/2026/04/Sharps-JJC-Client.png", order: 3 },
    { name: "WCBDD", image: "https://jjcsystems.com/wp-content/uploads/2026/02/WCBDD-JJC-Client.png", order: 4 },
    { name: "OSS", image: "https://jjcsystems.com/wp-content/uploads/2026/02/OSS-JJC-Client-1.png", order: 5 },
    { name: "Rantoul Foods", image: "https://jjcsystems.com/wp-content/uploads/2025/11/Rantoul-foods-.png", order: 6 },
    { name: "Hohman", image: "https://jjcsystems.com/wp-content/uploads/2025/03/JJC-Client-Hohman.png", order: 7 },
    { name: "Phillips Murrah", image: "https://jjcsystems.com/wp-content/uploads/2025/09/Phillips-Murrah-Client.png", order: 8 },
    { name: "High Plains", image: "https://jjcsystems.com/wp-content/uploads/2026/02/High-Plains-JJC-Client-1.png", order: 9 },
    { name: "Bali", image: "https://jjcsystems.com/wp-content/uploads/2025/04/JJC-Bali-Client.png", order: 10 },
    { name: "ESS", image: "https://jjcsystems.com/wp-content/uploads/2025/11/ESS-.png", order: 11 },
    { name: "JJC Client 4", image: "https://jjcsystems.com/wp-content/uploads/2024/08/JJC-Client-4.png", order: 12 },
    { name: "Conrad Polygraph", image: "https://jjcsystems.com/wp-content/uploads/2024/08/Conrad-Polygraph-JJC-Client-1-1.png", order: 13 },
    { name: "QPR", image: "https://jjcsystems.com/wp-content/uploads/2024/08/QPR-JJC-Client-2-2.png", order: 14 },
    { name: "JJC Client 3", image: "https://jjcsystems.com/wp-content/uploads/2024/08/JJC-Client-3.png", order: 15 },
    { name: "JJC Client 6", image: "https://jjcsystems.com/wp-content/uploads/2024/08/JJC-Client-6.png", order: 16 },
    { name: "JJC Client 7", image: "https://jjcsystems.com/wp-content/uploads/2024/09/JJC-Client-7.png", order: 17 },
    { name: "JJC Client 8", image: "https://jjcsystems.com/wp-content/uploads/2024/08/JJC-Client-8.png", order: 18 },
    { name: "JJC Client 5", image: "https://jjcsystems.com/wp-content/uploads/2024/08/JJC-Client-5.png", order: 19 },
    { name: "JJC Client 9", image: "https://jjcsystems.com/wp-content/uploads/2024/08/JJC-Client-9.png", order: 20 },
    { name: "JJC Client 10", image: "https://jjcsystems.com/wp-content/uploads/2024/08/JJC-Client-10.png", order: 21 },
    { name: "JJC VA Affairs", image: "https://jjcsystems.com/wp-content/uploads/2025/04/JJC-VA-Affairs.png", order: 22 },
    { name: "GSA", image: "https://jjcsystems.com/wp-content/uploads/2025/02/GSA-Logo-1.png", order: 23 },
    { name: "ACU", image: "https://jjcsystems.com/wp-content/uploads/2025/01/JJC-Client-ACU.png", order: 24 },
    { name: "Tico Tractors", image: "https://jjcsystems.com/wp-content/uploads/2025/05/JJC-Tico-Tractors.png", order: 25 },
    { name: "Invio Automation", image: "https://jjcsystems.com/wp-content/uploads/2025/06/Invio-Automation-JJC-Client.png", order: 26 },
    { name: "Carr", image: "https://jjcsystems.com/wp-content/uploads/2025/04/JJC-Client-Carr.png", order: 27 },
  ],

  /* ---------------- Success Stories ---------------- */
  successStoriesIntro: {
    eyebrow: "Success Stories",
    heading: "Business outcomes, not just completed implementations",
    lede:
      "These sample stories show how the section can communicate the challenge, the solution and the measurable result in language business and technology leaders can understand.",
  },
  successStories: [
    {
      industry: "Healthcare",
      title: "Modernizing document access without disrupting patient services",
      summary: "A regional healthcare organization replaced fragmented file shares with a governed SharePoint environment that made information easier to find and safer to manage.",
      metrics: [
        { value: "1.8 TB", label: "Illustrative data migrated" },
        { value: "45%", label: "Sample improvement in search time" },
      ],
      outcomes: [
        "Department-based information architecture and consistent permissions.",
        "Migration planning, validation and user adoption delivered as one engagement.",
        "Clear governance for ownership, retention and future site growth.",
      ],
      order: 1,
    },
    {
      industry: "Manufacturing",
      title: "Connecting finance and operations with Dynamics 365",
      summary: "A growing manufacturer moved from disconnected accounting and operational processes to one platform for finance, inventory, purchasing and reporting.",
      metrics: [
        { value: "32%", label: "Sample faster month-end close" },
        { value: "24%", label: "Sample reduction in manual handoffs" },
      ],
      outcomes: [
        "One source of truth for orders, inventory, purchasing and financial performance.",
        "Role-based workflows and approvals aligned to the organization's operating model.",
        "Executive reporting available without spreadsheet consolidation.",
      ],
      order: 2,
    },
    {
      industry: "Professional Services",
      title: "Turning weekly reporting into an always-current executive view",
      summary: "A services organization automated data preparation and introduced Power BI dashboards for pipeline, utilization, delivery performance and margin.",
      metrics: [
        { value: "4 hrs → 15 min", label: "Sample reporting cycle" },
        { value: "1 view", label: "Leadership source of truth" },
      ],
      outcomes: [
        "Automated data refresh replaced repetitive weekly preparation.",
        "Common KPI definitions gave leaders one consistent view of performance.",
        "Drill-down reporting helped teams act before delivery or margin issues grew.",
      ],
      order: 3,
    },
  ],

  /* ---------------- Testimonials (intro only — items come from Testimonial model) ---------------- */
  testimonialsIntro: {
    eyebrow: "Client Testimonials",
    heading: "See what our clients have to say",
    lede: "Quality of work, speed of response, and technology that improves both the daily grind and the long-term picture.",
  },

  /* ---------------- Insights ---------------- */
  insightsIntro: {
    eyebrow: "Insights",
    heading: "Practical guidance for better technology decisions",
    lede: "Blogs, guides, resources, checklists and straightforward answers designed for business and technology leaders.",
  },
  insights: [
    { icon: "i-ai", type: "Guide", meta: "9 min read", title: "A plain-English guide to Microsoft Copilot readiness", description: "The questions to answer about data, permissions, security and adoption before purchasing or expanding Copilot licences.", cta: "Read the guide", link: "#insights", order: 1 },
    { icon: "i-chart", type: "Blog", meta: "5 min read", title: "Why reporting projects fail before the dashboard is built", description: "How inconsistent definitions, unclear ownership and disconnected source systems undermine otherwise well-designed reporting.", cta: "Read the article", link: "#insights", order: 2 },
    { icon: "i-docs", type: "Resource", meta: "Download", title: "Technology planning worksheet for the next 12 months", description: "A structured template for documenting business priorities, current constraints, planned investments, dependencies and success measures.", cta: "Open the resource", link: "#insights", order: 3 },
    { icon: "i-check", type: "Checklist", meta: "12 items", title: "SharePoint migration readiness checklist", description: "Review ownership, permissions, file volume, unsupported content, retention requirements, user communication and cutover planning.", cta: "View the checklist", link: "#insights", order: 4 },
    { icon: "i-chats", type: "FAQ", meta: "6 answers", title: "What should you expect from an initial technology consultation?", description: "Clear answers about discovery, access requirements, estimates, timelines, responsibilities and what happens before any work begins.", cta: "Read the FAQs", link: "#insights", order: 5 },
  ],

  /* ---------------- Contact ---------------- */
  contactIntro: {
    eyebrow: "Get In Touch",
    heading: "Tell us what you're trying to fix",
    lede: "No sales script and no obligation. Describe the situation in your own words and we'll tell you honestly whether we're the right people for it.",
  },
  contactInfo: {
    steps: [
      "We read your message and route it to the specialist who knows the area — not a general inbox.",
      "A 30-minute call to understand your situation properly. No pitch deck.",
      "A written recommendation with clear scope, timeline and a fixed price.",
    ],
    contactDetails: [
      { icon: "i-mail", text: "<b>Email</b>hello@jjcsystems.com" },
      { icon: "i-phone", text: "<b>Phone</b>+1 (000) 000-0000" },
      { icon: "i-pin", text: "<b>Head office</b>Street address, Chicago, IL" },
      { icon: "i-clock", text: "<b>Support hours</b>24/7 global coverage" },
    ],
    organizationSizes: ["1–50 people", "51–250 people", "251–1,000 people", "1,000+ people"],
    interests: [
      "IT strategy & consulting",
      "AI readiness & Copilot enablement",
      "Managed IT & security",
      "Cloud & infrastructure",
      "Dynamics 365 business applications",
      "Data, reporting & integration",
      "Modern workplace & automation",
      "IT staffing",
      "Something else / not sure yet",
    ],
  },
};

const seedHomePage = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");

    const result = await HomePage.findOneAndUpdate(
      { singletonKey: "home" },
      { $set: homePageData },
      { new: true, upsert: true, runValidators: true }
    );

    console.log(`✅ HomePage seeded successfully. Document _id: ${result._id}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedHomePage();