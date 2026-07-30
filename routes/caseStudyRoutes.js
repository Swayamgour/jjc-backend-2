const express = require("express");
const router = express.Router();

const {
  createCaseStudy,
  getCaseStudies,
  getCaseStudyById,
  getCaseStudyBySlug,
  updateCaseStudy,
  deleteCaseStudy,
} = require("../controllers/caseStudyController");

const { protect, authorize } = require("../middleware/auth");

const { uploadImage } = require("../config/cloudinary");

/* ---------------------------- PUBLIC ---------------------------- */

router.get("/", getCaseStudies);

router.get("/slug/:slug", getCaseStudyBySlug);

router.post(
  "/",
  protect,
  authorize("admin", "editor"),
  uploadImage.fields([
    {
      name: "heroImage",
      maxCount: 1,
    },
  ]),
  createCaseStudy
);

router.put(
  "/:id",
  protect,
  authorize("admin", "editor"),
  uploadImage.fields([
    {
      name: "heroImage",
      maxCount: 1,
    },
  ]),
  updateCaseStudy
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCaseStudy
);

module.exports = router;