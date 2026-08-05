const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// ✅ Register Route
router.post("/register", registerUser);

// ✅ Login Route
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});
module.exports = router;
