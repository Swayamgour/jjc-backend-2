const express = require("express");
const {
  getChecklists,
  getFilterOptions,
  getLibraryStats,
  getChecklistBySlug,
  getChecklistById,
  createChecklist,
  updateChecklist,
  deleteChecklist,
} = require("../controllers/checklistController.js");
const { protect } = require("../middleware/auth.js");

const router = express.Router();

// order matters: static routes before /:slug
router.get("/", getChecklists);
router.get("/filters", getFilterOptions);
router.get("/stats", getLibraryStats);
router.get("/:slug", getChecklistBySlug);

router.get("/id/:id", protect,  getChecklistById);
router.post("/", protect,  createChecklist);
router.put("/:id", protect,  updateChecklist);
router.delete("/:id", protect,  deleteChecklist);

module.exports = router;