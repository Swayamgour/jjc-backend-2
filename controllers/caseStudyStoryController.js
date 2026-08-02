const slugify = require("slugify");
const CaseStudyStory = require("../models/CaseStudyStory");

// ======================================================
// CREATE STORY
// ======================================================

exports.createStory = async (req, res) => {
    try {
        const body = { ...req.body };

        if (!body.title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        body.slug =
            body.slug ||
            slugify(body.title, {
                lower: true,
                strict: true,
            });

        const existingStory = await CaseStudyStory.findOne({
            slug: body.slug,
        });

        if (existingStory) {
            return res.status(400).json({
                success: false,
                message: "Story already exists",
            });
        }

        const story = await CaseStudyStory.create(body);

        return res.status(201).json({
            success: true,
            message: "Story created successfully",
            data: story,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// GET ALL STORIES
// ======================================================

exports.getStories = async (req, res) => {
    try {
        const {
            search,
            status,
            page = 1,
            limit = 20,
        } = req.query;

        const query = {};

        if (status) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    organization: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const stories = await CaseStudyStory.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await CaseStudyStory.countDocuments(query);

        return res.status(200).json({
            success: true,
            count: stories.length,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: stories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// GET STORY BY ID
// ======================================================

exports.getStoryById = async (req, res) => {
    try {
        const story = await CaseStudyStory.findById(
            req.params.id
        ).populate("parentCategory");

        if (!story) {
            return res.status(404).json({
                success: false,
                message: "Story not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: story,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// GET STORY BY SLUG
// ======================================================

exports.getStoryBySlug = async (req, res) => {
    try {
        const story = await CaseStudyStory.findOne({
            slug: req.params.slug,
        })
            .populate("parentCategory")
            .populate("relatedStories.story");

        if (!story) {
            return res.status(404).json({
                success: false,
                message: "Story not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: story,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// UPDATE STORY
// ======================================================

exports.updateStory = async (req, res) => {
    try {
        const body = { ...req.body };

        if (body.title) {
            body.slug = slugify(body.title, {
                lower: true,
                strict: true,
            });
        }

        const story = await CaseStudyStory.findByIdAndUpdate(
            req.params.id,
            body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!story) {
            return res.status(404).json({
                success: false,
                message: "Story not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Story updated successfully",
            data: story,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// DELETE STORY
// ======================================================

exports.deleteStory = async (req, res) => {
    try {
        const story = await CaseStudyStory.findByIdAndDelete(
            req.params.id
        );

        if (!story) {
            return res.status(404).json({
                success: false,
                message: "Story not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Story deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================================
// RELATED STORIES — dedicated sub-resource API
// ======================================================

// GET /api/case-study-stories/:id/related
// Returns relatedStoriesTitle + the populated relatedStories array
exports.getRelatedStories = async (req, res) => {
    try {
        const story = await CaseStudyStory.findById(
            req.params.id
        ).populate("relatedStories.story");

        if (!story) {
            return res.status(404).json({
                success: false,
                message: "Story not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                relatedStoriesTitle: story.relatedStoriesTitle,
                relatedStories: story.relatedStories,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// POST /api/case-study-stories/:id/related
// Body: { story?: ObjectId, title?, slug?, category? }
// Adds one related-story entry
exports.addRelatedStory = async (req, res) => {
    try {
        const { story: storyRef, title, slug, category } = req.body;

        if (!storyRef && !title) {
            return res.status(400).json({
                success: false,
                message:
                    "Provide either a `story` id or at least a `title` for the related story",
            });
        }

        const parentStory = await CaseStudyStory.findById(
            req.params.id
        );

        if (!parentStory) {
            return res.status(404).json({
                success: false,
                message: "Story not found",
            });
        }

        parentStory.relatedStories.push({
            story: storyRef || undefined,
            title,
            slug,
            category,
        });

        await parentStory.save();
        await parentStory.populate("relatedStories.story");

        return res.status(201).json({
            success: true,
            message: "Related story added successfully",
            data: parentStory.relatedStories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// PUT /api/case-study-stories/:id/related
// Body: { relatedStoriesTitle?, relatedStories: [...] }
// Replaces the whole related-stories block in one go
exports.updateRelatedStories = async (req, res) => {
    try {
        const { relatedStoriesTitle, relatedStories } = req.body;

        if (!Array.isArray(relatedStories)) {
            return res.status(400).json({
                success: false,
                message: "`relatedStories` must be an array",
            });
        }

        const parentStory = await CaseStudyStory.findByIdAndUpdate(
            req.params.id,
            {
                ...(relatedStoriesTitle !== undefined && {
                    relatedStoriesTitle,
                }),
                relatedStories,
            },
            { new: true, runValidators: true }
        ).populate("relatedStories.story");

        if (!parentStory) {
            return res.status(404).json({
                success: false,
                message: "Story not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Related stories updated successfully",
            data: {
                relatedStoriesTitle: parentStory.relatedStoriesTitle,
                relatedStories: parentStory.relatedStories,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE /api/case-study-stories/:id/related/:relatedId
// Removes a single related-story entry by its sub-document _id
exports.removeRelatedStory = async (req, res) => {
    try {
        const parentStory = await CaseStudyStory.findById(
            req.params.id
        );

        if (!parentStory) {
            return res.status(404).json({
                success: false,
                message: "Story not found",
            });
        }

        const relatedItem = parentStory.relatedStories.id(
            req.params.relatedId
        );

        if (!relatedItem) {
            return res.status(404).json({
                success: false,
                message: "Related story entry not found",
            });
        }

        relatedItem.deleteOne();
        await parentStory.save();

        return res.status(200).json({
            success: true,
            message: "Related story removed successfully",
            data: parentStory.relatedStories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};