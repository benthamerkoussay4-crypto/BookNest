const Recommendation = require("../models/Recommendation");

// ✅ Add Recommendation
exports.addRecommendation = async (req, res) => {
  try {
    const { title, author, description } = req.body;

    const recommendation = await Recommendation.create({
      title,
      author,
      description,
      user: req.user._id,
    });

    res.status(201).json(recommendation);
  } catch (error) {
    res.status(500).json({ message: "Error adding recommendation" });
  }
};

// ✅ Get All Recommendations
exports.getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recommendations" });
  }
};

// ✅ Get Single Recommendation (Book Details)
exports.getSingleRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id)
      .populate("user", "name email")
      .populate("ratings.user", "name");

    if (!recommendation) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details" });
  }
};

// ✅ Add or Update Rating
exports.addRating = async (req, res) => {
  try {
    const { value } = req.body;
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({ message: "Book not found" });
    }

    const existingRating = recommendation.ratings.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (existingRating) {
      existingRating.value = value;
    } else {
      recommendation.ratings.push({
        user: req.user._id,
        value,
      });
    }

    const total = recommendation.ratings.reduce(
      (sum, r) => sum + r.value,
      0
    );

    recommendation.averageRating =
      recommendation.ratings.length > 0
        ? total / recommendation.ratings.length
        : 0;

    await recommendation.save();

    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ message: "Error adding rating" });
  }
};