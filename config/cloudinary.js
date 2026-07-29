const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for general images (hero banners, thumbnails)
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jjc-systems",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});

// Storage for case study images
const caseStudyStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jjc-systems/case-studies",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const uploadCaseStudyImage = multer({
  storage: caseStudyStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = { cloudinary, uploadImage, uploadCaseStudyImage };
