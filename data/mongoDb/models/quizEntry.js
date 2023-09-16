const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const QuizEntrySchema = new Schema({
  // Remove studentId property
  // studentId: Schema.Types.ObjectId,
  quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  openQuestionPoints: Number,
  closedQuestionPoints: Number,
  totalPoints: Number,
  date: Date,
  pass: Boolean,
});
export const QuizEntry =
  mongoose.models.QuizEntry || mongoose.model("QuizEntry", QuizEntrySchema);
