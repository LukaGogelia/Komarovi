const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const HouseSchema = new Schema({
  name: String,
  description: String,
  mentorId: Schema.Types.ObjectId,
  leaderId: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
});

export const House =
  mongoose.models.House || mongoose.model("House", HouseSchema);
