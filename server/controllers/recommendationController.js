const Recommendation = require("../models/Recommendation");
const User = require("../models/User");

/* ===============================
   TOGGLE LIKE
================================ */
exports.toggleLike = async (req, res) => {
  const recommendation = await Recommendation.findById(req.params.id);

  if (!recommendation) {
    return res.status(404).json({ message: "Book not found" });
  }

  const liked = recommendation.likes.includes(req.user._id);

  if (liked) {
    recommendation.likes.pull(req.user._id);
  } else {
    recommendation.likes.push(req.user._id);
  }

  await recommendation.save();
  res.json(recommendation);
};

/* ===============================
   ADD COMMENT
================================ */
exports.addComment = async (req, res) => {
  const { text } = req.body;

  const recommendation = await Recommendation.findById(req.params.id);

  if (!recommendation) {
    return res.status(404).json({ message: "Book not found" });
  }

  recommendation.comments.push({
    user: req.user._id,
    text,
  });

  await recommendation.save();
  res.json(recommendation);
};

/* ===============================
   FOLLOW / UNFOLLOW USER
================================ */
exports.followUser = async (req, res) => {
  const userToFollow = await User.findById(req.params.id);

  if (!userToFollow) {
    return res.status(404).json({ message: "User not found" });
  }

  const alreadyFollowing = req.user.following.includes(userToFollow._id);

  if (alreadyFollowing) {
    req.user.following.pull(userToFollow._id);
    userToFollow.followers.pull(req.user._id);
  } else {
    req.user.following.push(userToFollow._id);
    userToFollow.followers.push(req.user._id);
  }

  await req.user.save();
  await userToFollow.save();

  res.json({ message: "Follow status updated" });
};

/* ===============================
   SMART PERSONALIZED FEED
================================ */
exports.getFeed = async (req, res) => {
  const user = await User.findById(req.user._id);

  let feed;

  if (user.following.length > 0) {
    feed = await Recommendation.find({
      user: { $in: user.following },
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });
  } else {
    feed = await Recommendation.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });
  }

  res.json(feed);
};