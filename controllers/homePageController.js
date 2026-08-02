const HomePage = require("../models/HomePage");
const asyncHandler = require("express-async-handler");

// @desc Get homepage content
// @route GET /api/home
const getHomePage = asyncHandler(async (req, res) => {
  let doc = await HomePage.findOne({ singletonKey: "home" });

  if (!doc) {
    doc = await HomePage.create({
      singletonKey: "home",
    });
  }

  res.status(200).json({
    success: true,
    data: doc,
  });
});

// @desc Update homepage content
// @route PUT /api/home
const updateHomePage = asyncHandler(async (req, res) => {
  const updates = { ...req.body };

  delete updates.singletonKey;

  const doc = await HomePage.findOneAndUpdate(
    { singletonKey: "home" },
    { $set: updates },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: doc,
  });
});

// @desc Update single section
// @route PATCH /api/home/section/:key
const updateHomePageSection = asyncHandler(async (req, res) => {
  const { key } = req.params;

  const allowedKeys = [
    "heroSlides",
    "whyIntro",
    "whyCards",
    "partnerVisual",
    "partnerRows",
    "benefitsIntro",
    "benefits",
    "solutionsIntro",
    "solutionCards",
    "solutionProcess",
    "solutionsFooter",
    "platformsIntro",
    "platformsFooter",
    "servicesIntro",
    "serviceFamilies",
    "clientsIntro",
    "clientLogos",
    "successStoriesIntro",
    "successStories",
    "testimonialsIntro",
    "insightsIntro",
    "insights",
    "contactIntro",
    "contactInfo",
    "seo",
  ];

  if (!allowedKeys.includes(key)) {
    res.status(400);
    throw new Error(`Invalid section key: ${key}`);
  }

  const doc = await HomePage.findOneAndUpdate(
    { singletonKey: "home" },
    {
      $set: {
        [key]: req.body,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: doc[key],
  });
});

module.exports = {
  getHomePage,
  updateHomePage,
  updateHomePageSection,
};