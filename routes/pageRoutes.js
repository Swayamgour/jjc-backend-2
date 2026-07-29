const express = require("express");
const router = express.Router();


const ctrl = require("../controllers/pageController");

const { protect, authorize } = require("../middleware/auth");

const { uploadImage } = require("../config/cloudinary");


/* ==============================================================
 ALL ROUTES ARE SCOPED BY :type
 :type must be one of "service" | "industry" | "platform"
 (validated inside the controller).

 Example calls from the frontend:
   GET  /api/pages/service                -> all services
   GET  /api/pages/industry               -> all industries
   GET  /api/pages/platform/microsoft-365 -> single platform page
   POST /api/pages/service                -> create a service (admin)

 If you'd rather keep the exact old URLs (/api/services, ...),
 just mount this same router three times in app.js:
   app.use("/api/services",   (req,res,next)=>{req.params.type="service";  next();}, pageRoutes);
   app.use("/api/industries", (req,res,next)=>{req.params.type="industry"; next();}, pageRoutes);
   app.use("/api/platforms",  (req,res,next)=>{req.params.type="platform"; next();}, pageRoutes);
 and drop the ":type" prefix from the paths below.
================================================================ */


router.get(
    "/:type/menu",
    ctrl.getMenuPages
);



router.get(
    "/:type/by-category",
    ctrl.getPagesByCategory
);



router.get(
    "/:type",
    ctrl.getAllPages
);



router.get(
    "/:type/:slug",
    ctrl.getPage
);



router.post(
    "/:type",
    protect,
    authorize("admin", "editor"),
    uploadImage.fields([
        {
            name: "heroImage",
            maxCount: 1
        }
    ]),
    ctrl.createPage
);



router.put(
    "/:type/:slug",
    protect,
    authorize("admin", "editor"),
    uploadImage.fields([
        {
            name: "heroImage",
            maxCount: 1
        }
    ]),
    ctrl.updatePage
);



router.patch(
    "/:type/:id/publish",
    protect,
    authorize("admin", "editor"),
    ctrl.togglePublish
);



router.delete(
    "/:type/:slug",
    protect,
    authorize("admin"),
    ctrl.deletePage
);



module.exports = router;
