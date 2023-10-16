const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const TimeTableSchema = new Schema({
  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  lessons: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
      timeSlotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
        required: true,
      },
    },
  ],
});

const TimeTable =
  mongoose.models.TimeTable || mongoose.model("TimeTable", TimeTableSchema);
module.exports = TimeTable;
