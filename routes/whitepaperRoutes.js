const express = require("express");
const {
  getWhitepapers,
  getFilterOptions,
  getLibraryStats,
  getWhitepaperBySlug,
  getWhitepaperById,
  createWhitepaper,
  updateWhitepaper,
  deleteWhitepaper,
} = require("../controllers/whitepaperController.js");
const { protect } = require("../middleware/auth.js");

const router = express.Router();

router.get("/", getWhitepapers);
router.get("/filters", getFilterOptions); // must stay above /:slug
router.get("/stats", getLibraryStats);
router.get("/:slug", getWhitepaperBySlug);

router.get("/id/:id", protect,  getWhitepaperById);
router.post("/", protect,  createWhitepaper);
router.put("/:id", protect,  updateWhitepaper);
router.delete("/:id", protect,  deleteWhitepaper);

module.exports = router;