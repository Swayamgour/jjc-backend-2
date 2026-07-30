const express = require("express");

const router = express.Router();

const {
    createStory,
    getStories,
    getStoryById,
    getStoryBySlug,
    updateStory,
    deleteStory,
    getRelatedStories,
    addRelatedStory,
    updateRelatedStories,
    removeRelatedStory,
} = require("../controllers/caseStudyStoryController");

const { protect, authorize } = require("../middleware/auth");

// ======================================================
// PUBLIC ROUTES
// ======================================================

router.get("/", getStories);

router.get("/slug/:slug", getStoryBySlug);

router.get("/:id/related", getRelatedStories);

router.get("/:id", getStoryById);

// ======================================================
// PROTECTED ROUTES — main story
// ======================================================

router.post(
    "/",
    protect,
    authorize("admin", "editor"),
    createStory
);

router.put(
    "/:id",
    protect,
    authorize("admin", "editor"),
    updateStory
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteStory
);

// ======================================================
// PROTECTED ROUTES — related stories sub-resource
// ======================================================

router.post(
    "/:id/related",
    protect,
    authorize("admin", "editor"),
    addRelatedStory
);

router.put(
    "/:id/related",
    protect,
    authorize("admin", "editor"),
    updateRelatedStories
);

router.delete(
    "/:id/related/:relatedId",
    protect,
    authorize("admin"),
    removeRelatedStory
);

module.exports = router;