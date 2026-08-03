const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/contactController");
const { protect, authorize } = require("../middleware/auth");

// Public routes
router.post("/", ctrl.submitLead);

// Protected admin routes
router.get("/leads", protect, authorize("admin", "editor"), ctrl.getLeads);
router.get("/stats", protect, authorize("admin", "editor"), ctrl.getLeadStats);
router.get("/leads/:id", protect, authorize("admin", "editor"), ctrl.getLead);
router.patch("/leads/:id/status", protect, authorize("admin", "editor"), ctrl.updateLeadStatus);

module.exports = router;