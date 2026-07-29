const router = require("express").Router();

const {
  createCategory,
  getAllCategories,
  getAllItemsByCategory,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/categoryController");

// Category (Level 1: Services, Industries, Platforms)
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:slug/items", getAllItemsByCategory);
router.get("/:slug", getCategoryBySlug);
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// Subcategory (Level 2: Strategy & Transformation, Managed IT & Security)
router.post("/:id/subcategories", addSubcategory);
router.patch("/:id/subcategories/:subId", updateSubcategory);
router.delete("/:id/subcategories/:subId", deleteSubcategory);

// Item (Level 3: IT Strategy & Consulting, AI Readiness & Copilot Enablement)
router.post("/:id/subcategories/:subId/items", addItem);
router.patch("/:id/subcategories/:subId/items/:itemId", updateItem);
router.delete("/:id/subcategories/:subId/items/:itemId", deleteItem);

module.exports = router;