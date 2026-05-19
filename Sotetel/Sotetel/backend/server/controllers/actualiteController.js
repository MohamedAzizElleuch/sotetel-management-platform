const path = require("path");
const Actualite = require("../models/Actualite");

// ✅ Get all actualités
const getAllActualites = async (req, res) => {
  try {
    const actualites = await Actualite.find().sort({ createdAt: -1 });
    res.json(actualites);
  } catch (error) {
    console.error("❌ Error fetching actualités:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération des actualités.",
    });
  }
};

// ✅ Get single actualité by ID
const getActualiteById = async (req, res) => {
  try {
    const actu = await Actualite.findById(req.params.id);
    if (!actu) {
      return res.status(404).json({ message: "Actualité non trouvée" });
    }
    res.json(actu);
  } catch (error) {
    console.error("❌ Error fetching actualité:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Create an actualité (supports file + body)
const createActualite = async (req, res) => {
  try {
    const { title, description, imageUrl: fallbackUrl } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/actualites/${req.file.filename}`;
    } else if (fallbackUrl) {
      imageUrl = fallbackUrl;
    }

    const newActualite = new Actualite({ title, description, imageUrl });
    await newActualite.save();
    res.status(201).json(newActualite);
  } catch (error) {
    console.error("❌ Error creating actualite:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update an actualité (supports optional image update)
const updateActualite = async (req, res) => {
  try {
    const { title, description, imageUrl: fallbackUrl } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    const updatedFields = { title, description };

    if (req.file) {
      updatedFields.imageUrl = `/uploads/actualites/${req.file.filename}`;
    } else if (fallbackUrl) {
      updatedFields.imageUrl = fallbackUrl;
    }

    const updated = await Actualite.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Actualité non trouvée" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating actualite:", err);
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'actualité.",
    });
  }
};

// ✅ Delete an actualité
const deleteActualite = async (req, res) => {
  try {
    const deleted = await Actualite.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Actualité non trouvée" });
    }
    res.json({ message: "Actualité supprimée" });
  } catch (err) {
    console.error("❌ Error deleting actualite:", err);
    res.status(500).json({
      message: "Erreur lors de la suppression de l'actualité.",
    });
  }
};

// ✅ Upload actualité image separately (optional)
const uploadActualiteImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier n'a été envoyé." });
    }

    const imagePath = `/uploads/actualites/${req.file.filename}`;
    res.status(200).json({ imageUrl: imagePath });
  } catch (err) {
    console.error("❌ Error uploading image:", err);
    res.status(500).json({ message: "Erreur lors de l'upload de l'image." });
  }
};

module.exports = {
  getAllActualites,
  getActualiteById, // ✅ Add this export
  createActualite,
  updateActualite,
  deleteActualite,
  uploadActualiteImage,
};
