const HomeCardSection = require("../models/home/HomeCardSection");

const detailedServicesSeed = async () => {
    const items = [
        {
            title: "Dynamics 365 Business Central",
            subtitle: "Streamline Finance and Operations with Business Central",
            description:
                "Microsoft Dynamics 365 Business Central is an all-in-one business management solution that helps organizations connect financials, operations, sales, and customer service.",
            icon: "Landmark",
            link: "",
            order: 0,
        },
        {
            title: "Dynamics 365 Sales",
            subtitle: "Empower Your Sales Team with Intelligent CRM",
            description:
                "Dynamics 365 Sales helps sales teams build strong customer relationships and close deals faster.",
            icon: "TrendingUp",
            link: "",
            order: 1,
        },
        {
            title: "Dynamics 365 Customer Insights",
            subtitle: "Unify Customer Data and Deliver Personalized Experiences",
            description:
                "Dynamics 365 Customer Insights helps organizations create a complete view of their customers by unifying data from multiple sources.",
            icon: "Users",
            link: "",
            order: 2,
        },
        {
            title: "Dynamics 365 Customer Service",
            subtitle: "Deliver Exceptional Customer Support Experiences",
            description:
                "Dynamics 365 Customer Service enables organizations to provide fast, personalized support across all channels.",
            icon: "Headset",
            link: "",
            order: 3,
        },
        {
            title: "Dynamics 365 Finance",
            subtitle: "Transform Financial Operations and Decision-Making",
            description:
                "Dynamics 365 Finance helps organizations gain greater control over financial operations and make smarter decisions.",
            icon: "Wallet",
            link: "",
            order: 4,
        },
        {
            title: "Dynamics 365 Field Service",
            subtitle: "Optimize Field Operations and Improve Customer Satisfaction",
            description:
                "Dynamics 365 Field Service helps organizations manage field operations, resources, and customer appointments effectively.",
            icon: "Wrench",
            link: "",
            order: 5,
        },
        {
            title: "Microsoft 365",
            subtitle: "Empower Modern Work and Collaboration",
            description:
                "Microsoft 365 provides a comprehensive suite of productivity and collaboration tools for modern workplaces.",
            icon: "M365",
            link: "",
            order: 6,
        },
        {
            title: "Microsoft Copilot",
            subtitle: "Transform Productivity with AI-Powered Assistance",
            description:
                "Microsoft Copilot brings the power of AI to Microsoft 365 applications, helping users accomplish more with less effort.",
            icon: "Sparkles",
            link: "",
            order: 7,
        },
        {
            title: "Microsoft Purview",
            subtitle: "Manage Data Governance and Compliance with Confidence",
            description:
                "Microsoft Purview provides unified data governance and compliance solutions.",
            icon: "Eye",
            link: "",
            order: 8,
        },
        {
            title: "Microsoft Fabric",
            subtitle: "Unify Your Data Analytics and Business Intelligence",
            description:
                "Microsoft Fabric is an end-to-end analytics platform that unifies data integration, engineering, warehouse, and business intelligence.",
            icon: "Layers",
            link: "",
            order: 9,
        },
        {
            title: "Microsoft Intune",
            subtitle: "Simplify Endpoint Management and Security",
            description:
                "Microsoft Intune helps organizations manage and secure devices, apps, and data across the organization.",
            icon: "Smartphone",
            link: "",
            order: 10,
        },
        {
            title: "Microsoft Defender",
            subtitle: "Strengthen Your Security Posture with Advanced Threat Protection",
            description:
                "Microsoft Defender provides comprehensive security solutions to protect against cyber threats.",
            icon: "ShieldAlert",
            link: "",
            order: 11,
        },
        {
            title: "Microsoft Power Platform",
            subtitle: "Automate Workflows and Build Intelligent Business Applications",
            description:
                "Microsoft Power Platform empowers organizations to create custom solutions, automate processes, and analyze data.",
            icon: "Power",
            link: "",
            order: 12,
        },
        {
            title: "Microsoft Azure Cloud",
            subtitle: "Build, Deploy, and Scale Applications with Confidence",
            description:
                "Microsoft Azure provides a comprehensive cloud platform for building, deploying, and managing applications.",
            icon: "Azure",
            link: "",
            order: 13,
        },
        {
            title: "Microsoft Azure Virtual Desktop",
            subtitle: "Enable Secure Remote Work with Virtual Desktop Solutions",
            description:
                "Microsoft Azure Virtual Desktop provides a secure, scalable virtual desktop experience from the cloud.",
            icon: "MonitorSmartphone",
            link: "",
            order: 14,
        },
    ];

    

    console.log("✅ Detailed Services seeded successfully");
};

module.exports = detailedServicesSeed;