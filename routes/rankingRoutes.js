const express = require("express");
const Ranking = require("../models/Ranking");

const router = express.Router();

// Submit ranking
router.post("/", async (req, res) => {
  try {
    const { userId, category, rankedFoods } = req.body;
    const ranking = new Ranking({ userId, category, rankedFoods });
    await ranking.save();
    res.status(201).json(ranking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get rankings by category
router.get("/:category", async (req, res) => {
  const rankings = await Ranking.find({ category: req.params.category }).populate("userId", "username");
  res.json(rankings);
});

module.exports = router;
