const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ClubPresidentSchema = new Schema({
  president: [
    {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student", // Reference to the Student collection
      },
      academicYear: {
        type: Schema.Types.ObjectId,
        ref: "CurrentClass", // Reference to the CurrentClass collection
      },
    },
  ],
});

export const ClubPresident =
  mongoose.models.ClubPresident ||
  mongoose.model("ClubPresident", ClubPresidentSchema);
