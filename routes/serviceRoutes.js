const express = require("express");
const router = express.Router();


const ctrl = require("../controllers/serviceController");

const { protect, authorize } =
    require("../middleware/auth");

const { uploadImage } =
    require("../config/cloudinary");



router.get(
    "/menu",
    ctrl.getMenuServices
);



router.get(
    "/by-category",
    ctrl.getServicesByCategory
);



router.get(
    "/",
    ctrl.getAllServices
);



router.get(
    "/:slug",
    ctrl.getService
);



router.post(
    "/",
    protect,
    authorize("admin", "editor"),
    uploadImage.fields([
        {
            name: "heroImage",
            maxCount: 1
        }
    ]),
    ctrl.createService
);



router.put(
    "/:slug",
    protect,
    authorize("admin", "editor"),
    uploadImage.fields([
        {
            name: "heroImage",
            maxCount: 1
        }
    ]),
    ctrl.updateService
);



router.patch(
    "/:id/publish",
    protect,
    authorize("admin", "editor"),
    ctrl.togglePublish
);



router.delete(
    "/:slug",
    protect,
    authorize("admin"),
    ctrl.deleteService
);



module.exports = router;
