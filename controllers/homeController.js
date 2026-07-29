const Category = require("../models/Category");
const Service = require("../models/Service");
const Platform = require("../models/Platform");
const Industry = require("../models/Industry");
const CaseStudy = require("../models/CaseStudy");
const Testimonial = require("../models/Testimonial");
const FAQ = require("../models/FAQ");
const Resource = require("../models/Resource");
const HomeHero = require("../models/home/HomeHero");
const HomeCardSection = require("../models/home/HomeCardSection");


/* ==============================================================
   Helper: group published Services by Category -> Subcategory
================================================================== */

const buildServicesByCategory = (categories, services) => {

  return categories.map((category) => {

    const subcategories = (category.subcategories || [])
      .map((sub) => {

        const subServices = services
          .filter(
            (service) =>
              String(service.subCategory) === String(sub._id)
          )
          .map((service) => ({
            id: service._id,
            title: service.title,
            slug: service.slug,
            badge: service.badge,
            shortDescription: service.shortDescription,
            urlPath: service.urlPath,
            theme: service.theme,
            order: service.order
          }));

        return {
          id: sub._id,
          name: sub.name,
          slug: sub.slug,
          count: subServices.length,
          services: subServices
        };

      })
      .filter((sub) => sub.count > 0);

    const totalCount = subcategories.reduce(
      (sum, sub) => sum + sub.count,
      0
    );

    return {
      id: category._id,
      name: category.name,
      slug: category.slug,
      order: category.order,
      count: totalCount,
      subcategories
    };

  });

};



/* ==============================================================
   Helper: turn an array of HomeCardSection docs into a
   { sectionKey: doc } object, filling in any missing keys
   with an empty default so the frontend never has to guard
   against undefined sections.
================================================================== */

const buildSectionsByKey = (sections) => {

  const byKey = {};

  HomeCardSection.SECTION_KEYS.forEach((key) => {
    byKey[key] = {
      sectionKey: key,
      tag: "",
      title: "",
      description: "",
      outro: "",
      primaryLabel: "",
      primaryLink: "",
      secondaryLabel: "",
      secondaryLink: "",
      items: []
    };
  });

  sections.forEach((section) => {
    byKey[section.sectionKey] = section;
  });

  return byKey;

};





exports.getHomePageData = async (req, res) => {

  try {

    const [
      hero,
      sections,
      categories,
      services,
      platforms,
      industries,
      caseStudies,
      testimonials,
      faqs,
      resources
    ] = await Promise.all([

      HomeHero.findOne().lean(),

      HomeCardSection.find().lean(),

      Category.find({ isPublished: true })
        .sort({ order: 1 })
        .lean(),

      Service.find({ isPublished: true })
        .select(
          "title slug badge shortDescription category subCategory order urlPath theme"
        )
        .sort({ order: 1 })
        .lean(),

      Platform.find()
        .select("title slug badge shortDescription urlPath subCategory order")
        .sort({ order: 1 })
        .limit(12)
        .lean(),

      Industry.find({ isPublished: true })
        .select("title slug badge urlPath subCategory order")
        .sort({ order: 1 })
        .limit(12)
        .lean(),

      CaseStudy.find({ isPublished: true, isFeatured: true })
        .sort({ createdAt: -1 })
        .limit(6)
        .select(
          "title slug clientName clientLogo industry results featuredImage testimonialQuote"
        )
        .populate("industry", "title slug")
        .lean(),

      Testimonial.find({ isApproved: true })
        .sort({ isFeatured: -1, order: 1 })
        .limit(9)
        .populate("relatedService", "title slug")
        .lean(),

      FAQ.find({ isPublished: true })
        .sort({ isFeatured: -1, order: 1 })
        .limit(10)
        .lean(),

      Resource.find({ isPublished: true, isFeatured: true })
        .sort({ publishedAt: -1 })
        .limit(3)
        .select("title slug category thumbnail excerpt publishedAt readTime")
        .lean()

    ]);


    const servicesByCategory =
      buildServicesByCategory(categories, services);

    const sectionsByKey =
      buildSectionsByKey(sections);


    res.status(200).json({

      success: true,

      data: {

        hero: hero || {},

        whyChooseUs: sectionsByKey.whyChooseUs,
        businessServices: sectionsByKey.businessServices,
        detailedServices: sectionsByKey.detailedServices,
        challenges: sectionsByKey.challenges,
        solutionAreas: sectionsByKey.solutionAreas,
        benefits: sectionsByKey.benefits,
        clientLogos: sectionsByKey.clientLogos,
        leadershipTeam: sectionsByKey.leadershipTeam,
        platformCards: sectionsByKey.platformCards,
        whyJJCPartner: sectionsByKey.whyJJCPartner,
        cta: sectionsByKey.cta,
        deliveryProcess: sectionsByKey.deliveryProcess,

        categories,

        servicesByCategory,

        platforms,

        industries,

        caseStudies,

        testimonials,

        faqs,

        resources

      }

    });


  } catch (error) {

    console.error("Get Home Page Data Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
