const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/faqController");
const { protect, authorize } = require("../middleware/auth");

router.get("/", ctrl.getAllFAQs);
router.post("/", protect, authorize("admin", "editor"), ctrl.createFAQ);
router.put("/:id", protect, authorize("admin", "editor"), ctrl.updateFAQ);
router.delete("/:id", protect, authorize("admin"), ctrl.deleteFAQ);

module.exports = router;
