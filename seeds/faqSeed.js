const HomeCardSection = require("../models/home/HomeCardSection");

const faqSeed = async () => {
  const items = [
    {
      icon: "",
      title: "What are Microsoft Consulting Services?",
      subtitle: "",
      description:
        "Microsoft Consulting Services help businesses implement, optimize, and manage Microsoft technologies such as Microsoft 365, Azure, Dynamics 365, Power Platform, and security solutions.",
      link: "",
      order: 0,
    },
    {
      icon: "",
      title: "Why should businesses hire a Microsoft consultant?",
      subtitle: "",
      description:
        "A Microsoft consultant helps organizations choose the right solutions, improve implementation success, reduce technology challenges, and maximize Microsoft investments.",
      link: "",
      order: 1,
    },
    {
      icon: "",
      title: "What Microsoft solutions does JJC Systems provide?",
      subtitle: "",
      description:
        "JJC Systems provides Microsoft consulting for Microsoft 365, Azure, Dynamics 365, Power Platform, Business Central, SharePoint, Power BI, and Microsoft security solutions.",
      link: "",
      order: 2,
    },
    {
      icon: "",
      title: "How can Microsoft Azure help my business?",
      subtitle: "",
      description:
        "Azure provides secure cloud infrastructure, scalable applications, flexible computing resources, and modern cloud capabilities.",
      link: "",
      order: 3,
    },
    {
      icon: "",
      title: "Can Microsoft solutions integrate with existing systems?",
      subtitle: "",
      description:
        "Yes. Microsoft solutions can integrate with existing applications, workflows, and business platforms to improve efficiency.",
      link: "",
      order: 4,
    },
    {
      icon: "",
      title: "Does JJC Systems provide ongoing Microsoft support?",
      subtitle: "",
      description:
        "Yes. JJC Systems provides optimization, guidance, and support services to help businesses maintain successful Microsoft environments.",
      link: "",
      order: 5,
    },
  ];

  await HomeCardSection.findOneAndUpdate(
    { sectionKey: "faqs" },
    {
      sectionKey: "faqs",
      tag: "FREQUENTLY ASKED QUESTIONS",
      title: "Frequently Asked Questions",
      description:
        "Find answers to the most common questions about our Microsoft Consulting Services.",
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

  console.log("✅ FAQs seeded successfully");
};

module.exports = faqSeed;