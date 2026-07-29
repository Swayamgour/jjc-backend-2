const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},

		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "BlogCategory",
			required: true,
		},

		description: {
			type: String,
			required: true,
		},

		image: {
			type: String,
			default: "",
		},

		imageAlt: {
			type: String,
			default: "",
		},

		blogDate: {
			type: Date,
			required: true,
		},

		metaTitle: {
			type: String,
			default: "",
		},

		slug: {
			type: String,
			unique: true,
			required: true,
		},

		metaDescription: {
			type: String,
			default: "",
		},

		metaKeywords: {
			type: String,
			default: "",
		},

    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
	},
	{
		timestamps: true,
	},
);

blogSchema.pre("validate", function (next) {
	if (!this.slug && this.title) {
		this.slug = slugify(this.title, {
			lower: true,
			strict: true,
		});
	}

	next();
});

module.exports = mongoose.model("Blog", blogSchema);
