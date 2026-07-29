const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/testimonialController");
const { protect, authorize } = require("../middleware/auth");

router.get("/", ctrl.getAllTestimonials);
router.post("/", protect, authorize("admin", "editor"), ctrl.createTestimonial);
router.put("/:id", protect, authorize("admin", "editor"), ctrl.updateTestimonial);
router.delete("/:id", protect, authorize("admin"), ctrl.deleteTestimonial);

module.exports = router;
