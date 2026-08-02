const express = require("express");

const {
	getPosts,
	getFilterOptions,
	getPostBySlug,
	getPostById,
	createPost,
	updatePost,
	deletePost,
} = require("../controllers/blogController");

const { protect } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.get("/", getPosts);
router.get("/filters", getFilterOptions);
router.get("/:slug", getPostBySlug);

// Admin routes
router.get("/id/:id", protect, getPostById);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;