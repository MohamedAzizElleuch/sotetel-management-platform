const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const {
  getAllActualites,
  getActualiteById, // ✅ Add this import
  createActualite,
  updateActualite,
  deleteActualite,
  uploadActualiteImage,
} = require("../controllers/actualiteController");

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/requireRole");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "actualites"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "actualite-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;
  if (allowed.test(ext) && allowed.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images sont autorisées."));
  }
};

const upload = multer({ storage, fileFilter });

// Public route
router.get("/", getAllActualites);

// Admin-only routes with image upload support
router.post(
  "/",
  authMiddleware,
  requireRole("admin"),
  upload.single("image"),
  createActualite
);

router.put(
  "/:id",
  authMiddleware,
  requireRole("admin"),
  upload.single("image"),
  updateActualite
);

router.delete("/:id", authMiddleware, requireRole("admin"), deleteActualite);

// Route for getting a single actualité by ID (public)
router.get("/:id", getActualiteById); // ✅ Add this route

// Optional: separate route for uploading only images
router.post(
  "/upload",
  authMiddleware,
  requireRole("admin"),
  upload.single("image"),
  uploadActualiteImage
);

module.exports = router;
