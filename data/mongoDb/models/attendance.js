const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const attendanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  key: {
    type: String,
    enum: ["yes", "no"],
    required: true,
    default: "yes",
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject", // This assumes that your Subject schema is named 'Subject'
    required: true,
  },
});

const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

export default Attendance;
