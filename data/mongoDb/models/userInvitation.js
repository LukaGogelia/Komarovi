const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userInvitationSchema = new mongoose.Schema({
  role: String,
  visible: Boolean,
  ddElements: [String],
  firstName: String,
  lastName: String,
  invitationCode: String,
  nationalId: String,
  birthDate: String, // Ideally, this would be a Date type
  phone: String,
  email: String,
  isFamilyMember: Boolean,
  accepted: { type: Boolean, default: false }, // Flag indicating whether the invitation was accepted
  dateAccepted: Date, // Date when the invitation was accepted
  familyPosition: {
    type: String,
    enum: ["mother", "father", "child"],
  },
  expirationDate: {
    type: Date,
    default: Date.now() + 365 * 24 * 60 * 60 * 1000, // Add 1 year to current date
  },
  mother: { type: Schema.Types.ObjectId, ref: "UserInvitation" },
  father: { type: Schema.Types.ObjectId, ref: "UserInvitation" },
  children: [{ type: Schema.Types.ObjectId, ref: "UserInvitation" }],
});

export const UserInvitation =
  mongoose.models.UserInvitation ||
  mongoose.model("UserInvitation", userInvitationSchema);
