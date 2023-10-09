const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const HouseLeaderSchema = new Schema({
  leader: [
    {
      academicYear: { type: Schema.Types.ObjectId, ref: "House" }, // Reference to House collection
    },
  ],
});

export const HouseLeader =
  mongoose.models.HouseLeader ||
  mongoose.model("HouseLeader", HouseLeaderSchema);
