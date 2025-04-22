const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create new user
router.post("/", async (req, res) => {
  try {
    const { username, email, avatar } = req.body;
    const user = new User({ username, email, avatar });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
