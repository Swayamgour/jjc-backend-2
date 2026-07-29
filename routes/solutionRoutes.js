const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/solutionController");
const { protect, authorize } = require("../middleware/auth");

router.get("/menu", ctrl.getMenuSolutions);
router.get("/", ctrl.getAllSolutions);
router.get("/:slug", ctrl.getSolution);
router.post("/", protect, authorize("admin", "editor"), ctrl.createSolution);
router.put("/:slug", protect, authorize("admin", "editor"), ctrl.updateSolution);
router.patch("/:id/publish", protect, authorize("admin", "editor"), ctrl.togglePublish);
router.delete("/:slug", protect, authorize("admin"), ctrl.deleteSolution);

module.exports = router;
