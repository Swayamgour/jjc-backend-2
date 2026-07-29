// routes/platformRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/platformController");
const { protect, authorize } = require("../middleware/auth");
const { uploadImage } = require("../config/cloudinary");

router.get("/menu", ctrl.getMenuPlatforms);
router.get("/by-category", ctrl.getPlatformsByCategory);
router.get("/", ctrl.getAllPlatforms);
router.get("/:slug", ctrl.getPlatform);

router.post(
  "/",
  protect,
  authorize("admin", "editor"),
  uploadImage.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "overviewImage", maxCount: 1 },
  ]),
  ctrl.createPlatform
);

router.put(
  "/:slug",
  protect,
  authorize("admin", "editor"),
  uploadImage.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "overviewImage", maxCount: 1 },
  ]),
  ctrl.updatePlatform
);

router.patch("/:id/publish", protect, authorize("admin", "editor"), ctrl.togglePublish);
router.delete("/:slug", protect, authorize("admin"), ctrl.deletePlatform);

module.exports = router;