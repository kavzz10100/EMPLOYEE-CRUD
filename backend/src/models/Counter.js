const mongoose = require("mongoose");

// ✅ Schema for counter
const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

// ✅ Export the Mongoose model (not the schema!)
module.exports = mongoose.model("Counter", counterSchema);
