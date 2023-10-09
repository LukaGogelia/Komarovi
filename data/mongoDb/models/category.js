const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CategorySchema = new Schema({
  name: String,
  slug: { type: String, unique: true },
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
