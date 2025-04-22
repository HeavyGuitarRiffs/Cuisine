const express = require("express");
const ChatMessage = require("../models/ChatMessage");

const router = express.Router();

// Send a chat message
router.post("/", async (req, res) => {
  try {
    const { userId, username, message } = req.body;
    const chatMessage = new ChatMessage({ userId, username, message });
    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get recent chat messages
router.get("/", async (req, res) => {
  const messages = await ChatMessage.find().sort({ timestamp: -1 }).limit(50);
  res.json(messages);
});

module.exports = router;
