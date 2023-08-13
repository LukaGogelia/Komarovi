const mongoose = require("mongoose");

const { Schema, model } = mongoose;

// User model
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  roles: [String],
  houseId: Schema.Types.ObjectId,
  clubIds: [Schema.Types.ObjectId],
});

const User = model("User", UserSchema);

// Club model
const ClubSchema = new Schema({
  name: String,
  description: String,
  presidentId: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
});

const Club = model("Club", ClubSchema);

// House model
const HouseSchema = new Schema({
  name: String,
  description: String,
  mentorId: Schema.Types.ObjectId,
  leaderId: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
});

const House = model("House", HouseSchema);

// Grade Entry model
const GradeEntrySchema = new Schema({
  studentId: Schema.Types.ObjectId,
  teacherId: Schema.Types.ObjectId,
  subject: String,
  grade: Number,
  type: String,
  date: Date,
});

const GradeEntry = model("GradeEntry", GradeEntrySchema);

// Exam Entry model
const ExamEntrySchema = new Schema({
  studentId: Schema.Types.ObjectId,
  examId: Schema.Types.ObjectId,
  openQuestionPoints: Number,
  closedQuestionPoints: Number,
  totalPoints: Number,
  teacherId: Schema.Types.ObjectId,
  date: Date,
  pass: Boolean,
});

const ExamEntry = model("ExamEntry", ExamEntrySchema);

// Exam model
const ExamSchema = new Schema({
  subject: String,
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
  date: Date,
  type: String,
  participants: Number,
  passCount: Number,
});

const Exam = model("Exam", ExamSchema);

const PointsCommissionDecisionSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming students are also stored under the User model
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  submittedBy: {
    type: Schema.Types.ObjectId,
    ref: "User", // Referring to the User model
    required: true,
  },
  pointsAwarded: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "reviewed"],
    default: "pending",
  },
});

const PointsCommissionDecision = model(
  "PointsCommissionDecision",
  PointsCommissionDecisionSchema
);

// Export models
module.exports = {
  User,
  Club,
  House,
  GradeEntry,
  ExamEntry,
  Exam,
  PointsCommissionDecision,
};
