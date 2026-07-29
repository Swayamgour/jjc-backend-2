const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/seoController");
const { protect, authorize } = require("../middleware/auth");

router.get("/sitemap", ctrl.getSitemapData);
router.get("/:pageType/:slug", ctrl.getPageSEO);
router.put("/:pageType/:slug", protect, authorize("admin", "editor"), ctrl.updatePageSEO);

module.exports = router;
