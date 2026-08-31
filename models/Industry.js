const mongoose = require("mongoose");
const slugify = require("slugify");
const seoSchema = require("../utils/seoSchema");

/* -------------------------------- */
/* Common Schemas */
/* -------------------------------- */

const imageSchema = new mongoose.Schema(
	{
		url: String,
		publicId: String,
	},
	{ _id: false }
);

const processStepSchema = new mongoose.Schema(
	{
		step: Number,
		icon: String,
		title: String,
		description: String,
	},
	{ _id: false }
);

const technologySchema = new mongoose.Schema(
	{
		icon: String,
		label: String,
		desc: String,
	},
	{ _id: false }
);

const solutionSchema = new mongoose.Schema(
	{
		icon: String,
		title: String,
		description: String,
	},
	{ _id: false }
);

const benefitItemSchema = new mongoose.Schema(
	{
		icon: String,
		title: String,
		description: String,
	},
	{ _id: false }
);

const caseStudyItemSchema = new mongoose.Schema(
	{
		tag: String,
		title: String,
		description: String,
		stat: String,
		statLabel: String,
		color: String,
	},
	{ _id: false }
);

const faqSchema = new mongoose.Schema(
	{
		question: {
			type: String,
			required: true,
			trim: true,
		},
		answer: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ _id: false }
);


/* -------------------------------- */
/* Industry Schema */
/* -------------------------------- */

const industrySchema = new mongoose.Schema(
	{

		title: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},

		slug: {
			type: String,
			unique: true,
			lowercase: true,
		},

		urlPath: String,

		badge: String,

		breadcrumb: [String],


		// Category ke andar wali subcategories ki _id save hogi
		subCategory: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},


		order: {
			type: Number,
			default: 0,
		},

		isPublished: {
			type: Boolean,
			default: true,
		},


		/* Hero */

		hero: {

			description: String,

			subDescription: String,

			heroBadges: [String],

			heroImage: imageSchema,

		},


		/* Theme */

		theme: {

			accent: String,

			accentDark: String,

			accentLight: String,

			accentSoft: String,

			heroStart: String,

			heroEnd: String,

			accentRgb: String,

		},


		/* Overview */

		overview: {

			tag: String,

			title: String,

			brandLabel: String,

			image: imageSchema,

			paragraphs: [String],

			checklist: [String],

		},


		/* Solutions */

		solutions: {

			tag: String,

			title: String,

			subtitle: String,

			bg: String,

			columns: Number,

			alignLeft: Boolean,

			items: [solutionSchema],

		},


		/* Benefits */

		benefits: {

			tag: String,

			title: String,

			desc: String,

			visualIcon: String,

			miniIcons: [String],

			items: [benefitItemSchema],

			buttonLabel: String,

		},


		/* Implementation */

		implementationProcess: {

			tag: String,

			title: String,

			subtitle: String,

			steps: [processStepSchema],

		},


		/* Technologies */

		technologies: {

			tag: String,

			title: String,

			subtitle: String,

			columns: Number,

			items: [technologySchema],

			footerLink: String,

		},


		/* Case Studies */

		caseStudies: {

			tag: String,

			title: String,

			subtitle: String,

			items: [caseStudyItemSchema],

		},


		/* FAQ */

		faqs: {

			tag: String,

			title: String,

			items: [faqSchema],

		},


		/* CTA */

		cta: {

			title: String,

			description: String,

			primaryLabel: String,

			secondaryLabel: String,

		},


		/* SEO (standardized across all page types) */

		seo: { type: seoSchema, default: () => ({}) },

	},
	{
		timestamps: true,
	}
);


/* -------------------------------- */
/* Indexes */
/* -------------------------------- */

industrySchema.index({ isPublished: 1 });
industrySchema.index({ subCategory: 1 });


/* -------------------------------- */
/* Generate Slug */
/* -------------------------------- */

industrySchema.pre("save", function () {

	if (this.isModified("title") || !this.slug) {

		this.slug = slugify(this.title, {
			lower: true,
			strict: true,
		});

	} else {

		this.slug = slugify(this.slug, {
			lower: true,
			strict: true,
		});

	}


	this.urlPath = `/industries/${this.slug}`;

});


module.exports = mongoose.model("Industry", industrySchema);