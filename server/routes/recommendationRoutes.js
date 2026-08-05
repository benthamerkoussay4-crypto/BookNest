const express = require("express");
const {
  toggleLike,
  addComment,
  followUser,
  getFeed,
} = require("../controllers/recommendationController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Like
router.post("/:id/like", protect, toggleLike);

// ✅ Comment
router.post("/:id/comment", protect, addComment);

// ✅ Feed
router.get("/feed/me", protect, getFeed);

module.exports = router;