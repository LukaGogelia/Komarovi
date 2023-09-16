const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const AdminSchema = new Schema({
  permissions: [
    {
      type: String,
    },
  ],
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  dateAssigned: {
    type: Date,
    default: Date.now,
  },
});

export const Admin =
  mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
