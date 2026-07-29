const HomeCardSection = require("../models/home/HomeCardSection");

const testimonialSeed = async () => {
    const items = [
        {
            icon: "",
            title: "Sarah Johnson",
            subtitle: "CTO, Global Retail Corp",
            description:
                "JJC Systems transformed our business operations with Microsoft solutions. Their expertise and commitment to our success is unmatched.",
            link: "",
            order: 0,
        },
        {
            icon: "",
            title: "Michael Chen",
            subtitle: "IT Director, Manufacturing Inc.",
            description:
                "The team's deep Microsoft knowledge and strategic approach helped us achieve 85% increase in productivity. Highly recommended!",
            link: "",
            order: 1,
        },
        {
            icon: "",
            title: "Emily Rodriguez",
            subtitle: "Head of Digital, Finance Group",
            description:
                "Professional, responsive, and results-driven. JJC Systems delivered beyond our expectations on every project.",
            link: "",
            order: 2,
        },
    ];

    await HomeCardSection.findOneAndUpdate(
        { sectionKey: "testimonials" },
        {
            sectionKey: "testimonials",
            tag: "CLIENT TESTIMONIALS",
            title: "What Our Clients Say",
            description:
                "Hear from organizations that have partnered with JJC Systems to transform their business.",
            outro: "",
            primaryLabel: "",
            primaryLink: "",
            secondaryLabel: "",
            secondaryLink: "",
            isPublished: true,
            items,
        },
        {
            upsert: true,
            returnDocument: "after",
            runValidators: true,
            setDefaultsOnInsert: true,
        }
    );

    console.log("✅ Testimonials seeded successfully");
};

module.exports = testimonialSeed;