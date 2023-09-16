const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const PointsCommissionDecisionSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  submittedBy: {
    type: Schema.Types.ObjectId,
    ref: "User", // Referring to the User model
    required: true,
  },
  pointsAwarded: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "reviewed"],
    default: "pending",
  },
});

export const PointsCommissionDecision =
  mongoose.models.PointsCommissionDecision ||
  mongoose.model("PointsCommissionDecision", PointsCommissionDecisionSchema);
