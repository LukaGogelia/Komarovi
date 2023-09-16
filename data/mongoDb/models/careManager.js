const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CareManagerSchema = new Schema({
  classIds: [
    {
      classId: {
        type: Schema.Types.ObjectId,
        ref: "CurrentClass", // Reference to the Class collection
      },
    },
  ],
});

export const CareManager =
  mongoose.models.CareManager ||
  mongoose.model("CareManager", CareManagerSchema);
