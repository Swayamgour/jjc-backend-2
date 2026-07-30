const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth"); // adjust path to your actual auth middleware
const ctrl = require("../controllers/caseStudyCategoryController");

/* ------------------------- Public ------------------------- */

// Full listing page payload — hero + glance + auto stats + stories/gaps
// GET /api/case-study-categories/page/industry/healthcare
router.get("/page/:type/:slug", ctrl.getCategoryPage);

// Raw list — e.g. for navbar "Browse by Industry" menu
router.get("/", ctrl.getCategories);
router.get("/:id", ctrl.getCategoryById);

/* ------------------------- Admin ------------------------- */

router.post("/", protect, authorize("admin", "editor"), ctrl.createCategory);
router.put("/:id", protect, authorize("admin", "editor"), ctrl.updateCategory);
router.delete("/:id", protect, authorize("admin", "editor"), ctrl.deleteCategory);

module.exports = router;
