const mongoose = require("mongoose");
const { Quiz, QuizEntry } = require("./models");
const { ObjectId } = require("mongodb");
// Modify this path to the actual path of your models

async function seedQuizEntries(studentId, academicYear) {
  await mongoose.connect("mongodb://127.0.0.1:27017/komarovi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const quizzes = await Quiz.find({
    academicYear: academicYear,
    quizNumber: { $lte: 4 },
  });

  for (let quiz of quizzes) {
    const openQuestionPoints = Math.floor(
      Math.random() *
        (quiz.openQuestions.count * quiz.openQuestions.pointsEach + 1)
    );
    const closedQuestionPoints = Math.floor(
      Math.random() *
        (quiz.closedQuestions.count * quiz.closedQuestions.pointsEach + 1)
    );
    const totalPoints = openQuestionPoints + closedQuestionPoints;

    let quizEntry = new QuizEntry({
      studentId: studentId, // mongoose will auto-cast this
      quizId: quiz._id,
      openQuestionPoints: openQuestionPoints,
      closedQuestionPoints: closedQuestionPoints,
      totalPoints: totalPoints,
      pass: totalPoints >= quiz.passPoints,
    });

    await quizEntry.save();
  }

  console.log("Quiz entries seeding completed!");
  await mongoose.disconnect();
}

seedQuizEntries("64db5e53c84450e9247d9940", "2021-2022");
