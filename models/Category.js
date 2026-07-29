const mongoose = require("mongoose");
const slugify = require("slugify");

const makeSlug = (str) => slugify(str, { lower: true, strict: true });

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	slug: {
		type: String,
		lowercase: true,
	},
	icon: {
		type: String,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	order: {
		type: Number,
		default: 0,
	},
});

const subcategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	slug: {
		type: String,
		lowercase: true,
	},
	icon: {
		type: String,
		trim: true,
	},
	order: {
		type: Number,
		default: 0,
	},
	items: [itemSchema],
});

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Category name is required"],
			trim: true,
			unique: true,
			maxlength: 100,
		},

		slug: {
			type: String,
			unique: true,
			lowercase: true,
		},

		subcategories: [subcategorySchema],

		isPublished: {
			type: Boolean,
			default: true,
		},

		order: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

categorySchema.pre("save", function () {
	// Generate category slug
	if (this.isModified("name") || this.isNew) {
		this.slug = makeSlug(this.name);
	}

	// Generate subcategory + item slugs
	if (this.subcategories?.length) {
		this.subcategories.forEach((sub) => {
			sub.slug = makeSlug(sub.slug?.trim() || sub.name);

			if (sub.items?.length) {
				sub.items.forEach((item) => {
					item.slug = makeSlug(item.slug?.trim() || item.name);
				});
			}
		});
	}
});

module.exports = mongoose.model("Category", categorySchema);