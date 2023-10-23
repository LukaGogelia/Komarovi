const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const CurrentClassSchema = new Schema({
  parallelNumber: {
    type: Number,
    required: true,
  },
  gradeLevel: {
    type: Number,
    required: true,
    min: 7,
    max: 12,
  },
  academicYear: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return (
          /^\d{4}-\d{4}$/.test(v) &&
          parseInt(v.substr(5, 4)) - parseInt(v.substr(0, 4)) === 1
        );
      },
      message: (props) => `${props.value} is not a valid academic year format!`,
    },
  },
  timeTableIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeTable",
      required: true,
    },
  ],
});
const CurrentClass =
  mongoose.models.CurrentClass ||
  mongoose.model("CurrentClass", CurrentClassSchema);

export default CurrentClass;
