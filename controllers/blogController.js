const asyncHandler = require("express-async-handler");
const BlogPost = require("../models/BlogPost.js");
const { PLATFORM_LABELS, SERVICE_LABELS, INDUSTRY_LABELS } = require("../utils/blogLabels.js");

/* Builds the response shape the frontend Hero/Card components expect */
const shapePost = (postDoc) => {
	const post = postDoc.toObject();

	const platformLabel = PLATFORM_LABELS[post.platform] || post.platform;
	const industryLabel = INDUSTRY_LABELS[post.industry] || post.industry;
	const serviceLabel = SERVICE_LABELS[post.service] || post.service;

	return {
		...post,
		platformLabel,
		serviceLabel,
		industryLabel,
		hero: {
			eyebrow: post.eyebrow?.trim() || `${platformLabel} · ${post.type}`,
			title: post.title,
			lede: post.description,
			ctaPrimary: post.ctaPrimary,
			ctaSecondary: post.ctaSecondary,
			takeaways: post.takeaways,
		},
		breadcrumb: {
			parent: post.breadcrumb?.parent || "Insights",
			parentLink: post.breadcrumb?.parentLink || "/blog",
			current: post.breadcrumb?.current?.trim() || industryLabel,
		},
	};
};

// @desc  List posts with filters, search, pagination (public: published only)
// @route GET /api/blog
const getPosts = asyncHandler(async (req, res) => {
	const { platform, service, industry, type, search, page = 1, limit = 30, all } = req.query;

	const query = {};
	if (!all) query.isPublished = true; // admin panel passes ?all=true to see drafts too
	if (platform) query.platform = platform;
	if (service) query.service = service;
	if (industry) query.industry = industry;
	if (type) query.type = type;
	if (search) query.$text = { $search: search };

	const pageNum = Math.max(1, parseInt(page, 10));
	const limitNum = Math.max(1, parseInt(limit, 10));

	const [posts, total] = await Promise.all([
		BlogPost.find(query)
			.sort({ publishedAt: -1 })
			.skip((pageNum - 1) * limitNum)
			.limit(limitNum),
		BlogPost.countDocuments(query),
	]);

	res.status(200).json({
		success: true,
		data: posts.map(shapePost),
		pagination: {
			total,
			page: pageNum,
			limit: limitNum,
			totalPages: Math.ceil(total / limitNum),
			hasMore: pageNum * limitNum < total,
		},
	});
});

// @desc  Get distinct filter values for the chip UI (dynamic, not hardcoded)
// @route GET /api/blog/filters
const getFilterOptions = asyncHandler(async (req, res) => {
	const [platforms, services, industries, types] = await Promise.all([
		BlogPost.distinct("platform", { isPublished: true }),
		BlogPost.distinct("service", { isPublished: true }),
		BlogPost.distinct("industry", { isPublished: true }),
		BlogPost.distinct("type", { isPublished: true }),
	]);

	res.status(200).json({
		success: true,
		data: {
			platforms: platforms.map((p) => ({ value: p, label: PLATFORM_LABELS[p] || p })),
			services: services.map((s) => ({ value: s, label: SERVICE_LABELS[s] || s })),
			industries: industries.map((i) => ({ value: i, label: INDUSTRY_LABELS[i] || i })),
			types,
		},
	});
});

// @desc  Get single post by slug (public) + related posts (same industry)
// @route GET /api/blog/:slug
const getPostBySlug = asyncHandler(async (req, res) => {
	const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true });

	if (!post) {
		res.status(404);
		throw new Error("Post not found");
	}

	const related = await BlogPost.find({
		industry: post.industry,
		slug: { $ne: post.slug },
		isPublished: true,
	})
		.sort({ publishedAt: -1 })
		.limit(3);

	res.status(200).json({
		success: true,
		data: shapePost(post),
		related: related.map(shapePost),
	});
});

// @desc  Get single post by id (admin — for edit form, includes drafts)
// @route GET /api/blog/id/:id
const getPostById = asyncHandler(async (req, res) => {
	const post = await BlogPost.findById(req.params.id);
	if (!post) {
		res.status(404);
		throw new Error("Post not found");
	}
	res.status(200).json({ success: true, data: post });
});

// @desc  Create post (admin)
// @route POST /api/blog
// @route POST /api/blog
const createPost = asyncHandler(async (req, res) => {
	const data = {
		...req.body,
	};

	// Parse JSON fields coming from FormData
	if (req.body.ctaPrimary) {
		data.ctaPrimary = JSON.parse(req.body.ctaPrimary);
	}

	if (req.body.ctaSecondary) {
		data.ctaSecondary = JSON.parse(req.body.ctaSecondary);
	}

	if (req.body.breadcrumb) {
		data.breadcrumb = JSON.parse(req.body.breadcrumb);
	}

	if (req.body.takeaways) {
		data.takeaways = JSON.parse(req.body.takeaways);
	}

	if (req.body.seo) {
		data.seo = JSON.parse(req.body.seo);
	}

	// Convert boolean
	if (req.body.isPublished !== undefined) {
		data.isPublished = req.body.isPublished === "true";
	}

	// Feature image
	if (req.files?.featureImage?.[0]) {
		data.featureImage = req.files.featureImage[0].path;
	}

	const post = await BlogPost.create(data);

	res.status(201).json({
		success: true,
		data: post,
	});
});
// @desc  Update post (admin)
// @route PUT /api/blog/:id
// @route PUT /api/blog/:id
const updatePost = asyncHandler(async (req, res) => {
	const data = {
		...req.body,
	};

	// Parse JSON fields coming from FormData
	if (req.body.ctaPrimary) {
		data.ctaPrimary = JSON.parse(req.body.ctaPrimary);
	}

	if (req.body.ctaSecondary) {
		data.ctaSecondary = JSON.parse(req.body.ctaSecondary);
	}

	if (req.body.breadcrumb) {
		data.breadcrumb = JSON.parse(req.body.breadcrumb);
	}

	if (req.body.takeaways) {
		data.takeaways = JSON.parse(req.body.takeaways);
	}

	if (req.body.seo) {
		data.seo = JSON.parse(req.body.seo);
	}

	// Convert boolean
	if (req.body.isPublished !== undefined) {
		data.isPublished = req.body.isPublished === "true";
	}

	// New feature image
	if (req.files?.featureImage?.[0]) {
		data.featureImage = req.files.featureImage[0].path;
	}

	const post = await BlogPost.findByIdAndUpdate(
		req.params.id,
		data,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!post) {
		return res.status(404).json({
			success: false,
			message: "Blog post not found",
		});
	}

	res.status(200).json({
		success: true,
		data: post,
	});
});

// @desc  Delete post (admin)
// @route DELETE /api/blog/:id
const deletePost = asyncHandler(async (req, res) => {
	const post = await BlogPost.findByIdAndDelete(req.params.id);
	if (!post) {
		res.status(404);
		throw new Error("Post not found");
	}
	res.status(200).json({ success: true, message: "Post deleted" });
});

module.exports = {
	getPosts,
	getFilterOptions,
	getPostBySlug,
	getPostById,
	createPost,
	updatePost,
	deletePost,
};