const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  passwordHashed: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  nationalIdNumber: {
    type: String,
    required: true,
    trim: true,
  },
  roles: {
    type: [String],
    required: true,
    enum: [
      "student",
      "teacher",
      "caremanager",
      "admin",
      "parent",
      "commissionmember",
    ],
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
