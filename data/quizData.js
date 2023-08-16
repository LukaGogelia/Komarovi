import { Quiz } from "@/data/mongoDb/models";
import { QuizEntry } from "@/data/mongoDb/models";
import mongoose from "mongoose";

export async function useFetchQuizData() {
  await mongoose.connect("mongodb://127.0.0.1:27017/komarovi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const mathId = await Quiz.find({ subject: "math" }, "_id");
  const physicsId = await Quiz.find({ subject: "physics" }, "_id");
  const extractIds = (arr) => arr.map((item) => item._id);
  const mathArray = extractIds(mathId);
  const physicsArray = extractIds(physicsId);

  const mathList = await QuizEntry.find({
    studentId: "64db5e53c84450e9247d9940",
    quizId: { $in: mathArray },
  }).populate({
    path: "quizId",
    select: "totalPoints quizNumber academicYear", // Add date here
  });

  const physicsList = await QuizEntry.find({
    studentId: "64db5e53c84450e9247d9940",
    quizId: { $in: physicsArray },
  }).populate({
    path: "quizId",
    select: "totalPoints quizNumber academicYear", // Add date here
  });
  // Calculate the percentage for math
  const mathPercentage = mathList.map(
    (Quiz) => (Quiz.totalPoints / Quiz.quizId.totalPoints) * 100
  );

  const physicsPercentage = physicsList.map(
    (Quiz) => (Quiz.totalPoints / Quiz.quizId.totalPoints) * 100
  );

  //   console.log(mathPercentage);
  //   console.log(physicsPercentage);

  mongoose.disconnect();

  const arr = [];
  const names = [
    "Quiz 1",
    "Quiz 2",
    "Quiz 3",
    "Quiz 4",
    "Quiz 5",
    "Quiz 6",
    "Quiz 7",
    "Quiz 8",
    "Quiz 9",
    "Quiz 10",
  ]; // Replace with the appropriate names

  for (let i = 1; i < 11; i++) {
    let obj = { name: names[i - 1] };
    let mathQuiz = mathList.find((em) => em.quizId.quizNumber === i);
    if (mathQuiz) {
      obj.math = (mathQuiz.totalPoints / mathQuiz.quizId.totalPoints) * 100;
      obj.mathYear = mathQuiz.quizId.academicYear; // Add date here
    }
    let physicsQuiz = physicsList.find((em) => em.quizId.quizNumber === i);
    if (physicsQuiz) {
      obj.physics =
        (physicsQuiz.totalPoints / physicsQuiz.quizId.totalPoints) * 100;
      obj.physicsYear = physicsQuiz.quizId.academicYear; // Add date here
    }

    if (Object.keys(obj).length > 1) {
      arr.push(obj);
    }
  }

  return arr;
}
