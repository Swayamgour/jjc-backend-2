const express = require("express");
const router = express.Router();
const { register, login, getMe, updateMe } = require("../controllers/authController");
const { protect, authorize } = require("../middleware/auth");

router.post("/login", login);
router.post("/register", protect, authorize("admin"), register);
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);

module.exports = router;




const Service = require("../models/Service");
const Category = require("../models/Category");
const { cloudinary } = require("../config/cloudinary");
const slugify = require("slugify");
const parseJsonFields = require("../utils/parseJsonFields");


// GET ALL SERVICES
exports.getAllServices = async (req, res) => {
    try {

        const filter = {};

        if (req.query.subCategory) {
            filter.subCategory = req.query.subCategory;
        }


        const services = await Service.find(filter)
            .sort({ order: 1 });


        const data = await Promise.all(
            services.map(async (service) => {

                const obj = service.toObject();

                const category = await Category.findOne(
                    {
                        "subcategories._id": service.subCategory,
                    },
                    {
                        subcategories: 1
                    }
                );


                if (category) {

                    const subCategory =
                        category.subcategories.id(service.subCategory);


                    obj.subCategory = service.subCategory;
                    obj.subCategoryName =
                        subCategory?.name || "";

                } else {

                    obj.subCategory = service.subCategory;
                    obj.subCategoryName = "";

                }


                return obj;

            })
        );


        res.status(200).json({
            success: true,
            count: data.length,
            data
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};




// GET SINGLE SERVICE
exports.getService = async (req, res) => {

    try {

        const service = await Service.findOne({
            slug: req.params.slug
        });


        if (!service) {

            return res.status(404).json({
                success: false,
                message: "Service not found"
            });

        }



        const serviceObj = service.toObject();



        const category = await Category.findOne(
            {
                "subcategories._id": service.subCategory
            },
            {
                subcategories: 1
            }
        );



        if (category) {

            const subCategory =
                category.subcategories.id(
                    service.subCategory
                );


            serviceObj.subCategory =
                service.subCategory;


            serviceObj.subCategoryName =
                subCategory?.name || "";


        } else {

            serviceObj.subCategory =
                service.subCategory;

            serviceObj.subCategoryName = "";

        }



        res.status(200).json({
            success: true,
            data: serviceObj
        });



    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// CREATE SERVICE SAME AS PLATFORM

exports.createService = async (req, res) => {

    try {

        const body = { ...req.body };


        const jsonFields = [
            "breadcrumb",
            "hero",
            "overview",
            "capabilities",
            "benefits",
            "implementationProcess",
            "industries",
            "caseStudies",
            "faqs",
            "cta",
            "theme",
            "seo",
        ];


        parseJsonFields(body, jsonFields);



        body.hero = body.hero || {};
        body.overview = body.overview || {};



        const heroFile =
            req.files?.heroImage?.[0];


        const overviewFile =
            req.files?.overviewImage?.[0];



        if (heroFile) {

            body.hero.image = {
                url: heroFile.path,
                publicId: heroFile.filename
            };

        }



        if (overviewFile) {

            body.overview.image = {
                url: overviewFile.path,
                publicId: overviewFile.filename
            };

        }



        body.urlPath = `/services/${slugify(body.title, {
            lower: true,
            strict: true
        })}`;



        const service =
            await Service.create(body);



        res.status(201).json({
            success: true,
            data: service
        });



    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};