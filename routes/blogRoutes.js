const express = require("express");
const router = express.Router();

const { uploadImage } = require("../config/cloudinary");

const {
	createBlog,
	getAllBlogs,
	getPublishedBlogs,
	getBlogById,
	getBlogBySlug,
	updateBlog,
	toggleBlogStatus,
	deleteBlog,
} = require("../controllers/blogController");

// Create Blog
router.post("/",  uploadImage.single("image"), createBlog);

// Admin - All Blogs
router.get("/", getAllBlogs);

// Public - Published Blogs
router.get("/published", getPublishedBlogs);

// Get Blog by ID
router.get("/id/:id", getBlogById);

// Get Blog by Slug
router.get("/:slug", getBlogBySlug);

// Toggle Publish Status
router.patch("/:id/status",  toggleBlogStatus);

// Update Blog
router.put("/:id",  uploadImage.single("image"), updateBlog);

// Delete Blog
router.delete("/:id",  deleteBlog);

module.exports = router;
