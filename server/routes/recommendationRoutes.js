const express = require("express");
const { addRecommendation } = require("../controllers/recommendationController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, addRecommendation);

module.exports = router;