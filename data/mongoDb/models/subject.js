const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const SubjectSchema = new Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
module.exports = Subject;
