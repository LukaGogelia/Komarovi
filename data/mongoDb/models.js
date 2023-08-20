const mongoose = require("mongoose");

const { Schema, model } = mongoose;

// RegistrationCode model
const RegistrationCodeSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: "Family",
    required: true,
  },
  expirationDate: {
    type: Date,
    default: function () {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() + 9);
      return currentDate;
    },
  },
  roles: [
    {
      type: String,
    },
  ],
});

const RegistrationCode =
  mongoose.models.RegistrationCode ||
  mongoose.model("RegistrationCode", RegistrationCodeSchema);

const FamilySchema = new Schema({
  mother: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  father: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Family = mongoose.models.Family || mongoose.model("Family", FamilySchema);

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String, // Ensure to hash this before saving
  phone: String,
  nationalIdNumber: String, // New field for national ID number
  roles: [String],
  houseId: Schema.Types.ObjectId,
  clubIds: [Schema.Types.ObjectId],
  bookmarkedNews: [{ type: Schema.Types.ObjectId, ref: "News" }],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// News model
const NewsSchema = new Schema({
  title: String,
  content: String,
  imageSmall: String,
  imageLarge: String,
  authorId: { type: Schema.Types.ObjectId, ref: "User" },
  datePosted: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  // bookmarksCount: { type: Number, default: 0 },
  // bookmarkedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isDeleted: { type: Boolean, default: false },
});

const News = mongoose.models.News || mongoose.model("News", NewsSchema);

// Category model
const CategorySchema = new Schema({
  name: String,
  slug: { type: String, unique: true },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

// Club model
const ClubSchema = new Schema({
  name: String,
  description: String,
  presidentId: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
});

const Club = mongoose.models.Club || mongoose.model("Club", ClubSchema);

// House model
const HouseSchema = new Schema({
  name: String,
  description: String,
  mentorId: Schema.Types.ObjectId,
  leaderId: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
});

const House = mongoose.models.House || mongoose.model("House", HouseSchema);

// Grade Entry model
const GradeEntrySchema = new Schema({
  studentId: Schema.Types.ObjectId,
  teacherId: Schema.Types.ObjectId,
  subject: String,
  grade: Number,
  type: String,
  date: Date,
});

const GradeEntry =
  mongoose.models.GradeEntry || mongoose.model("GradeEntry", GradeEntrySchema);

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

const ExamEntry =
  mongoose.models.ExamEntry || mongoose.model("ExamEntry", ExamEntrySchema);

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

const Exam = mongoose.models.Exam || mongoose.model("Exam", ExamSchema);

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

const PointsCommissionDecision =
  mongoose.models.PointsCommissionDecision ||
  mongoose.model("PointsCommissionDecision", PointsCommissionDecisionSchema);

// Export models
module.exports = {
  User,
  Club,
  House,
  GradeEntry,
  ExamEntry,
  Exam,
  PointsCommissionDecision,
  News,
  Category,
  RegistrationCode,
  Family,
};
