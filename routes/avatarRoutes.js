const express = require("express");
const multer = require("multer");
const path = require("path");
const uploadAvatar = require("../controllers/uploadAvatar"); // Import controller

const router = express.Router();

// Set up storage for uploaded avatars
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Use the controller function for avatar upload
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

module.exports = router;
