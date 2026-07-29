// routes/industryRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/industryController");
const { protect, authorize } = require("../middleware/auth");
const { uploadImage } = require("../config/cloudinary");

router.get("/menu", ctrl.getMenuIndustries);
router.get("/by-category", ctrl.getIndustriesByCategory);
router.get("/", ctrl.getAllIndustries);
router.get("/:slug", ctrl.getIndustry);

router.post(
  "/",
  protect,
  authorize("admin", "editor"),
  uploadImage.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "overviewImage", maxCount: 1 },
  ]),
  ctrl.createIndustry
);

router.put(
  "/:slug",
  protect,
  authorize("admin", "editor"),
  uploadImage.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "overviewImage", maxCount: 1 },
  ]),
  ctrl.updateIndustry
);

router.patch("/:id/publish", protect, authorize("admin", "editor"), ctrl.togglePublish);
router.delete("/:slug", protect, authorize("admin"), ctrl.deleteIndustry);

module.exports = router;