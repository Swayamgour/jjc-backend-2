require("dotenv").config();

const mongoose = require("mongoose");
const Page = require("../models/Page");

const PAGE_SLUG = "it-strategy-consulting";

const sections = {
    definition: {
        eyebrow: "The basics",
        title: "What is IT strategy consulting?",
        layersLabel: "Where strategy sits within IT consulting and services",

        layers: [
            {
                icon: "route",
                title: "Strategy",
                description: "Where to go, in what order",
                tag: "This page",
            },
            {
                icon: "hub",
                title: "Architecture",
                description: "How it fits together",
                tag: "Consulting",
            },
            {
                icon: "wrench",
                title: "Implementation",
                description: "Building it",
                tag: "Delivery",
            },
            {
                icon: "shield",
                title: "Security",
                description: "Protecting it",
                tag: "Delivery",
            },
            {
                icon: "loop",
                title: "Managed support",
                description: "Running it",
                tag: "Ongoing",
            },
        ],

        paragraphs: [
            "IT strategy consulting is outside help in deciding what technology your organization should invest in, in what order, and why. A good engagement ends with a written plan: what you have today, what it costs, what to change first, who owns each piece, and how the spending ties back to business goals.",

            "It sits upstream of broader IT consulting services. Strategy decides where to go and in what sequence. The wider range of IT consulting and services, including architecture, implementation, security and managed support, then makes it happen. JJC Systems does both, which keeps the plan grounded in what can actually be built.",
        ],
    },

    whoFor: {
        eyebrow: "Who it's for",
        title: "Who IT strategy consulting is for",

        subtitle:
            "Organizations tend to look for IT consulting services at a few recognizable points.",

        honestNote:
            "If you have a stable environment, a clear plan and a team that agrees on priorities, you probably don't need us yet.",

        items: [
            "Leadership is approving technology budgets without a clear view of what's already spent or what comes next.",
            "A new CIO, IT director or CEO needs an independent read on the current estate.",
            "Growth, an acquisition or a regulatory change is about to put pressure on systems that were never planned as a whole.",
            "The IT team is busy but can't show progress against anything the business cares about.",
            "Licence renewals, a cloud move or a Microsoft 365 or Dynamics 365 decision are approaching and need a considered answer.",
        ],
    },

    microsoftPlatforms: {
        eyebrow: "Microsoft platforms",

        title: "Where Microsoft technology fits into the plan",

        subtitle:
            "JJC Systems is a Microsoft-focused consultancy, so most roadmaps we produce involve decisions across the Microsoft stack. Typical questions include:",

        items: [
            {
                icon: "grid",
                title: "Microsoft 365 and licensing",
                description:
                    "Which plans you actually need, and where you're paying for entitlements nobody uses.",
            },
            {
                icon: "cloud",
                title: "Azure",
                description:
                    "What belongs in the cloud, what stays where it is, and how to keep cloud costs predictable.",
            },
            {
                icon: "apps",
                title: "Dynamics 365",
                description:
                    "Whether an older ERP or CRM should be replaced, and when.",
            },
            {
                icon: "shield",
                title: "Security and identity",
                description:
                    "How Microsoft Entra ID, Defender and Purview fit into your risk and compliance goals.",
            },
            {
                icon: "spark",
                title: "Copilot and AI readiness",
                description:
                    "Whether your data, permissions and processes are ready before you roll anything out.",
            },
        ],

        note:
            "Where a non-Microsoft tool is the better answer, the plan says so.",
    },

    faqs: {
        eyebrow: "FAQs",
        title: "Frequently asked questions",
        helpText: "Can't find your question?",
        helpLinkText: "Ask us directly",
        helpLinkHref: "/contact",

        items: [
            {
                question: "What does an IT strategy consultant do?",
                answer:
                    "They assess your current technology, work with leadership to understand business goals, and produce a prioritized, costed roadmap. A good consultant also documents the reasoning behind decisions and helps you govern the plan afterwards.",
                open: true,
            },

            {
                question:
                    "What's the difference between IT consulting services and IT strategy consulting?",
                answer:
                    "IT consulting services is the broader category, covering advice on architecture, security, cloud, applications and support. IT strategy consulting is the planning part: deciding what to do, in what order and at what cost. JJC Systems offers both.",
            },

            {
                question: "How long does an IT strategy engagement take?",
                answer:
                    "It depends on the size and complexity of the environment. A focused assessment can be short, while a full roadmap with business cases takes longer. We give you a timeline after a first conversation, and not before.",
            },

            {
                question: "How much does IT strategy consulting cost?",
                answer:
                    "Cost depends on scope, number of systems and how much stakeholder input is needed. We scope the work after an initial conversation and agree the price before starting.",
            },

            {
                question: "Do you only work with Microsoft technology?",
                answer:
                    "Microsoft is our core focus, including Microsoft 365, Azure and Dynamics 365. Roadmaps cover the whole estate, and we'll recommend other tools where they fit better.",
            },

            {
                question: "Is this only for large enterprises?",
                answer:
                    "No. Mid-sized organizations often get value quickly because spend and priorities are spread across fewer people who are already stretched. The method scales to the size of the estate.",
            },

            {
                question: "What will we have at the end?",
                answer:
                    "A documented current state, a cost baseline, a sequenced roadmap with owners and dependencies, a business case for the major moves, and decision records for key technical choices.",
            },

            {
                question: "Can you help deliver the plan too?",
                answer:
                    "Yes. JJC Systems also provides implementation, managed IT and security services, so you can hand parts of the roadmap to us or to another partner of your choice.",
            },
        ],
    },
};

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Find ONLY the existing service page
        const page = await Page.findOne({
            type: "service",
            slug: PAGE_SLUG,
        });

        if (!page) {
            throw new Error(
                `Page not found: service/${PAGE_SLUG}`
            );
        }

        // ONLY update these 4 fields
        page.definition = sections.definition;
        page.whoFor = sections.whoFor;
        page.microsoftPlatforms = sections.microsoftPlatforms;
        page.faqs = sections.faqs;

        await page.save();

        console.log(
            `Updated only definition, whoFor, microsoftPlatforms and faqs for "${page.title}"`
        );

        console.log("Category:", page.category);
        console.log("SubCategory:", page.subCategory);

        await mongoose.disconnect();

        console.log("Seed completed successfully.");

        process.exit(0);
    } catch (err) {
        console.error("Seed failed:", err.message);

        await mongoose.disconnect().catch(() => { });

        process.exit(1);
    }
})();