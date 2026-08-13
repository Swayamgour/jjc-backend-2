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

const { protect, authorize } = require("../middleware/auth");

const { uploadImage } = require("../config/cloudinary");

const router = express.Router();


/* ---------------------------- PUBLIC ---------------------------- */

// Get all published blog posts
router.get("/", getPosts);

// Get filter options
router.get("/filters", getFilterOptions);

// Get blog post by slug
router.get("/slug/:slug", getPostBySlug);


/* ---------------------------- ADMIN / EDITOR ---------------------------- */

// Get blog post by ID
router.get(
    "/id/:id",
    protect,
    authorize("admin", "editor"),
    getPostById
);


// Create blog post
router.post(
    "/",
    protect,
    authorize("admin", "editor"),
    uploadImage.fields([
        {
            name: "featureImage",
            maxCount: 1,
        },
    ]),
    createPost
);


// Update blog post
router.put(
    "/:id",
    protect,
    authorize("admin", "editor"),
    uploadImage.fields([
        {
            name: "featureImage",
            maxCount: 1,
        },
    ]),
    updatePost
);


// Delete blog post
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deletePost
);


module.exports = router;