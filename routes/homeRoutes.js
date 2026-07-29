const express = require("express");
const router = express.Router();

const { getHomePageData } = require("../controllers/homeController");

// GET /api/home  -> everything the Home Page needs in one call
router.get("/", getHomePageData);

module.exports = router;
