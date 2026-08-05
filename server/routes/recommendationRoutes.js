const express = require("express");
const {
  addRecommendation,
  getAllRecommendations,
  getSingleRecommendation,
  addRating,
} = require("../controllers/recommendationController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ IMPORTANT: "/" must come BEFORE "/:id"

// ✅ Get All Recommendations
router.get("/", getAllRecommendations);

// ✅ Get Single Recommendation
router.get("/:id", getSingleRecommendation);

// ✅ Add Recommendation
router.post("/", protect, addRecommendation);

// ✅ Add Rating
router.post("/:id/rate", protect, addRating);

module.exports = router;