const Recommendation = require("../models/Recommendation");

// ✅ Add Recommendation
exports.addRecommendation = async (req, res) => {
  try {
    const { title, author, description, rating } = req.body;

    const recommendation = await Recommendation.create({
      title,
      author,
      description,
      rating,
      user: req.user._id,
    });

    res.status(201).json(recommendation);
  } catch (error) {
    res.status(500).json({ message: "Error adding recommendation" });
  }
};