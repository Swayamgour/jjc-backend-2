const express = require("express");
const router = express.Router();
const { getMegaMenu } = require("../controllers/navController");

router.get("/mega-menu", getMegaMenu);

module.exports = router;
