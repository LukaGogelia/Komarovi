const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const timeSlotSchema = new Schema({
  number: {
    type: Number,
    required: true,
    unique: true, // Assuming each time slot has a unique number
  },
  time: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // This regex will validate a string of format "HH:MM - HH:MM"
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9] - ([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid time slot format!`,
    },
  },
});
const TimeSlot =
  mongoose.models.TimeSlot || mongoose.model("TimeSlot", timeSlotSchema);
module.exports = TimeSlot;
