const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const QuizSchema = new Schema({
  subject: {
    type: String,
    enum: ["physics", "math"],
    required: true,
  },
  gradeLevel: Number,
  totalPoints: Number,
  passPoints: Number,
  closedQuestions: {
    count: Number,
    pointsEach: Number,
  },
  openQuestions: {
    count: Number,
    pointsEach: Number,
  },
  type: String,
  participants: Number,
  passCount: Number,
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
  quizNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
});
export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
