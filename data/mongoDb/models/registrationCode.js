const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const RegistrationCodeSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: "Family",
    required: true,
  },
  expirationDate: {
    type: Date,
    default: function () {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 9);
      return currentDate;
    },
  },
  roles: [
    {
      type: String,
    },
  ],
});

export const RegistrationCode =
  mongoose.models.RegistrationCode ||
  mongoose.model("RegistrationCode", RegistrationCodeSchema);
