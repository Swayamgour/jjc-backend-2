const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/resourceController");
const { protect, authorize } = require("../middleware/auth");

router.get("/featured", ctrl.getFeaturedResources);
router.get("/", ctrl.getAllResources);
router.get("/:slug", ctrl.getResource);
router.post("/", protect, authorize("admin", "editor"), ctrl.createResource);
router.put("/:slug", protect, authorize("admin", "editor"), ctrl.updateResource);
router.patch("/:slug/publish", protect, authorize("admin", "editor"), ctrl.togglePublish);
router.delete("/:slug", protect, authorize("admin"), ctrl.deleteResource);

module.exports = router;
