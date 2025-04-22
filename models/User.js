const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String }, // URL or base64 image
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
