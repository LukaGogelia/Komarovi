const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const StudentSchema = new Schema({
  classIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "CurrentClass", // Reference to the Class collection
    },
  ],
  houseIds: [
    {
      houseId: {
        type: Schema.Types.ObjectId,
        ref: "House", // Reference to the House collection
      },
      academicYear: {
        type: Schema.Types.ObjectId,
        ref: "CurrentHouse", // Reference to the CurrentHouse collection
      },
    },
  ],
  receivedPoints: [
    {
      type: Schema.Types.ObjectId,
      ref: "PointsCommissionDecision",
    },
  ],
  receivedGrade: [
    {
      type: Schema.Types.ObjectId,
      ref: "GradeEntry",
    },
  ],
  clubParticipant: [
    {
      clubId: {
        type: Schema.Types.ObjectId,
        ref: "Club", // Reference to the Club collection
      },
      join: {
        type: Date, // Join date
      },
      leave: {
        type: Date, // Leave date
      },
    },
  ],
  quizEntries: [
    {
      type: Schema.Types.ObjectId,
      ref: "QuizEntry", // Reference to the QuizEntry collection
    },
  ],
  gradeEntries: [
    {
      type: Schema.Types.ObjectId,
      ref: "GradeEntry", // Reference to the GradeEntry collection
    },
  ],
  pointsCommissionDecision: [
    {
      type: Schema.Types.ObjectId,
      ref: "PointsCommissionDecision", // Reference to the PointsCommissionDecision collection
    },
  ],
  quiz: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  decision: [{ type: Schema.Types.ObjectId, ref: "PointsCommissionDecision" }],
  clubIds: [
    {
      clubId: {
        type: Schema.Types.ObjectId,
        ref: "Club", // Reference to the Club collection
      },
      academicYear: {
        type: Schema.Types.ObjectId,
        ref: "CurrentClass", // Reference to the CurrentClass/Class collection
      },
    },
  ],
  attendanceIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Attendance", // Reference to the Attendance collection
    },
  ],
});

StudentSchema.methods.getStudentPoints = async function () {
  // Assuming that pointsCommissionDecision contains an array of documents
  // with a "points" property representing the individual points

  // Find the related PointsCommissionDecision documents
  await this.populate("pointsCommissionDecision").execPopulate();

  // Sum the total points
  const totalPoints = this.pointsCommissionDecision.reduce((sum, decision) => {
    return sum + decision.points; // assuming "points" is the property containing the individual points
  }, 0);

  // Calculate the personal points and obtained points for the house
  return {
    personalPoints: totalPoints * 0.15,
    obtainedPointsForHouse: totalPoints * 0.85,
  };
};

export const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);
export default Student;
