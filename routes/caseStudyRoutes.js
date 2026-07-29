const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth"); // adjust path to your actual auth middleware
const { uploadImage } = require("../config/cloudinary");

const ctrl = require("../controllers/caseStudyController");
const categoryCtrl = require("../controllers/caseStudyCategoryController");

/* ------------------------- Case Studies ------------------------- */

router.get("/", ctrl.getCaseStudies);
router.get("/:slug", ctrl.getCaseStudyBySlug);

router.post(
  "/",
  protect,
  authorize("admin", "editor"),
  uploadImage.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "testimonialImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  ctrl.createCaseStudy
);

router.put(
  "/:id",
  protect,
  authorize("admin", "editor"),
  uploadImage.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "testimonialImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  ctrl.updateCaseStudy
);

router.delete("/:id", protect, authorize("admin", "editor"), ctrl.deleteCaseStudy);

module.exports = router;
