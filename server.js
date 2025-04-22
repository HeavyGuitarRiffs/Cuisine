require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");  // Required for WebSockets
const { Server } = require("socket.io");
const avatarRoutes = require("./routes/avatarRoutes");

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow frontend to connect
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
require('dotenv').config(); // Ensure you load environment variables
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Routes
app.use("/api", avatarRoutes);
// Connect to MongoDB
mongoose
.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB: CuisineFoodRanking"))
.catch((err) => console.error("MongoDB connection error:", err));

// Avatar Schema & Model
const AvatarSchema = new mongoose.Schema({
  imageUrl: String,
});
const Avatar = mongoose.model("Avatar", AvatarSchema);

// Chat Message Schema & Model
const ChatMessageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  timestamp: { type: Date, default: Date.now },
});
const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

// Set up Multer for avatar uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Avatar upload route
app.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const imageUrl = `data:image/png;base64,${req.file.buffer.toString("base64")}`;
  const avatar = new Avatar({ imageUrl });
  await avatar.save();

  res.json({ imageUrl });
});

// Fetch all avatars
app.get("/avatars", async (req, res) => {
  const avatars = await Avatar.find();
  res.json(avatars);
});

// Fetch chat history
app.get("/chat-history", async (req, res) => {
  const messages = await ChatMessage.find().sort({ timestamp: 1 }).limit(50); // Load last 50 messages
  res.json(messages);
});

// WebSocket: Real-time chat
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // Send message to all users
  socket.on("sendMessage", async (data) => {
    const { text, sender } = data;

    // Save to MongoDB
    const message = new ChatMessage({ text, sender });
    await message.save();

    io.emit("receiveMessage", { text, sender, timestamp: new Date() });
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
