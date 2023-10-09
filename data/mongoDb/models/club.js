const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ClubSchema = new Schema({
  name: String,
  description: String,
  presidentId: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
});

export const Club = mongoose.models.Club || mongoose.model("Club", ClubSchema);
