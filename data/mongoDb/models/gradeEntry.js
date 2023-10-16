const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const GradeEntrySchema = new Schema({
  subject: String,
  grade: Number,
  type: String,
  date: Date,
});

export const GradeEntry =
  mongoose.models.GradeEntry || mongoose.model("GradeEntry", GradeEntrySchema);
module.exports = GradeEntry;
