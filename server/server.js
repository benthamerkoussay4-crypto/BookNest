const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

// ✅ Load env variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/recommendations", recommendationRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("✅ BookNest API is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});