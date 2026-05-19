// actualite.js (CommonJS version)
const mongoose = require("mongoose");

const actualiteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Actualite", actualiteSchema);
