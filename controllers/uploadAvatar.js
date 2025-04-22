const multer = require("multer");
const path = require("path");

// Configure storage (Uploads saved in 'uploads/' folder)
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter }).single("avatar");

const uploadAvatar = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    // Construct image URL
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ avatarUrl: imageUrl });
  });
};

module.exports = uploadAvatar;
