const express = require("express");

const {
    getHomePage,
    updateHomePage,
    updateHomePageSection,
} = require("../controllers/homePageController");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", getHomePage);

router.put("/", protect, updateHomePage);

router.patch("/section/:key", protect, updateHomePageSection);

module.exports = router;