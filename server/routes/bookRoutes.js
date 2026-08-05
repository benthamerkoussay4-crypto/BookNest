const express = require("express");
const axios = require("axios");

const router = express.Router();

// ✅ Search Books
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );

    res.json(response.data.items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

module.exports = router;