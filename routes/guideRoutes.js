const express = require("express");
const {
  getGuides,
  getFilterOptions,
  getGuideBySlug,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide,
} = require("../controllers/guideController.js");
const { protect } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", getGuides);
router.get("/filters", getFilterOptions); // must stay above /:slug
router.get("/:slug", getGuideBySlug);

router.get("/id/:id", protect,  getGuideById);
router.post("/", protect,  createGuide);
router.put("/:id", protect,  updateGuide);
router.delete("/:id", protect,  deleteGuide);

module.exports = router;