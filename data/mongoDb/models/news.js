const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const NewsSchema = new Schema({
  title: String,
  content: String,
  imageSmall: String,
  imageLarge: String,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  datePosted: { type: Date, default: Date.now },
  category: String,
  isDeleted: { type: Boolean, default: false },
  oldId: String
});

const News = mongoose.models.News || mongoose.model("News", NewsSchema);
module.exports = { News };

