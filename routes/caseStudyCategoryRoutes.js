const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth"); // adjust path to your actual auth middleware
const categoryCtrl = require("../controllers/caseStudyCategoryController");

router.get("/", categoryCtrl.getCaseStudyCategories);

router.post(
  "/",
  protect,
  authorize("admin", "editor"),
  categoryCtrl.createCaseStudyCategory
);

router.put(
  "/:id",
  protect,
  authorize("admin", "editor"),
  categoryCtrl.updateCaseStudyCategory
);

router.delete(
  "/:id",
  protect,
  authorize("admin", "editor"),
  categoryCtrl.deleteCaseStudyCategory
);

module.exports = router;
