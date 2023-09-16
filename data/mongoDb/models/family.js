const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const FamilySchema = new Schema({
  mother: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  father: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Family =
  mongoose.models.Family || mongoose.model("Family", FamilySchema);
