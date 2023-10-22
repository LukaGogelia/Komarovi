// const mongoose = require("mongoose");
// // const { Quiz, QuizEntry } = require("./models");
// const { ObjectId } = require("mongodb");
// // Modify this path to the actual path of your models

// async function seedQuizEntries(studentId, academicYear) {
//   await mongoose.connect("mongodb://127.0.0.1:27017/komarovi", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const quizzes = await Quiz.find({
//     academicYear: academicYear,
//     quizNumber: { $lte: 4 },
//   });

//   for (let quiz of quizzes) {
//     const openQuestionPoints = Math.floor(
//       Math.random() *
//       (quiz.openQuestions.count * quiz.openQuestions.pointsEach + 1)
//     );
//     const closedQuestionPoints = Math.floor(
//       Math.random() *
//       (quiz.closedQuestions.count * quiz.closedQuestions.pointsEach + 1)
//     );
//     const totalPoints = openQuestionPoints + closedQuestionPoints;

//     let quizEntry = new QuizEntry({
//       studentId: studentId, // mongoose will auto-cast this
//       quizId: quiz._id,
//       openQuestionPoints: openQuestionPoints,
//       closedQuestionPoints: closedQuestionPoints,
//       totalPoints: totalPoints,
//       pass: totalPoints >= quiz.passPoints,
//     });

//     await quizEntry.save();
//   }

//   console.log("Quiz entries seeding completed!");
//   await mongoose.disconnect();
// }

// seedQuizEntries("64db5e53c84450e9247d9940", "2021-2022");








const mongoose = require('mongoose');
const { News } = require('../models/news.js');


// Connect to MongoDB
mongoose.connect('mongodb+srv://luka-gogelia:9uHJUCP31qbZNOEb@komarovi.276krd8.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set isDeleted field to false for all News documents
// Function to transform categories
function transformCategory(category) {

  if (category === 'success') {
    return 'successes';
  }
  if (category === 'exam') {
    return 'exams';
  }
  return category;
}


async function updateNewsDocuments() {
  try {
    // Fetch all news documents
    const newsDocuments = await News.find();

    // Iterate over the news documents and make updates
    for (let newsDoc of newsDocuments) {
      if (newsDoc.category) {
        newsDoc.category = transformCategory(newsDoc.category);
      }
      newsDoc.isDeleted = false;
      await newsDoc.save();
    }

    console.log("Documents updated successfully!");

  } catch (error) {
    console.error("Error updating documents:", error);
  }
}

// Call the function
updateNewsDocuments()
  .then(() => {
    // Close the connection or perform any other post-update tasks
    mongoose.disconnect();
  });
