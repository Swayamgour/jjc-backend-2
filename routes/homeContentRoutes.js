const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/homeContentController");
const { protect, authorize } = require("../middleware/auth");
const { uploadImage } = require("../config/cloudinary");

/* ==============================================================
   HERO
================================================================== */

router.get("/hero", ctrl.getHero);

router.put(
  "/hero",
  protect,
  authorize("admin", "editor"),
  uploadImage.single("image"),
  ctrl.updateHero
);

/* ==============================================================
   SECTIONS  (whyChooseUs, businessServices, detailedServices,
   challenges, solutionAreas, benefits, clientLogos, leadershipTeam,
   platformCards, whyJJCPartner, cta, deliveryProcess)
================================================================== */

// Admin listing of every section at once
router.get(
  "/sections",
  protect,
  authorize("admin", "editor"),
  ctrl.getAllSections
);

// Public: fetch one section (auto-creates empty defaults if missing)
router.get("/sections/:key", ctrl.getSection);

// Update section header text
router.put(
  "/sections/:key",
  protect,
  authorize("admin", "editor"),
  ctrl.updateSectionHeader
);

// Reset a section back to empty defaults
router.delete(
  "/sections/:key",
  protect,
  authorize("admin"),
  ctrl.deleteSection
);

/* ---------------- Section Items ---------------- */

router.post(
  "/sections/:key/items",
  protect,
  authorize("admin", "editor"),
  ctrl.addSectionItem
);

router.put(
  "/sections/:key/items/:itemId",
  protect,
  authorize("admin", "editor"),
  ctrl.updateSectionItem
);

router.delete(
  "/sections/:key/items/:itemId",
  protect,
  authorize("admin"),
  ctrl.deleteSectionItem
);

router.patch(
  "/sections/:key/items/reorder",
  protect,
  authorize("admin", "editor"),
  ctrl.reorderSectionItems
);

router.post(
  "/sections/:key/items/:itemId/image",
  protect,
  authorize("admin", "editor"),
  uploadImage.single("image"),
  ctrl.uploadSectionItemImage
);

module.exports = router;
