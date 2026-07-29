const Service = require("../models/Service");
const Platform = require("../models/Platform");
const Solution = require("../models/Solution");
const Industry = require("../models/Industry");
const CaseStudy = require("../models/CaseStudy");
const Testimonial = require("../models/Testimonial");
const FAQ = require("../models/FAQ");
// const Contact = require("../models/Contact");

exports.getDashboardStats = async (req, res) => {
    try {
        const [
            services,
            platforms,
            solutions,
            industries,
            caseStudies,
            testimonials,
            faqs,
            // contacts,
        ] = await Promise.all([
            Service.countDocuments(),
            Platform.countDocuments(),
            Solution.countDocuments(),
            Industry.countDocuments(),
            CaseStudy.countDocuments(),
            Testimonial.countDocuments(),
            FAQ.countDocuments(),
            // Contact.countDocuments(),
        ]);

        res.status(200).json({
            success: true,
            data: {
                services,
                platforms,
                solutions,
                industries,
                caseStudies,
                testimonials,
                faqs,
                // contacts,
                totalContent:
                    services +
                    platforms +
                    solutions +
                    industries +
                    caseStudies +
                    testimonials +
                    faqs,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};