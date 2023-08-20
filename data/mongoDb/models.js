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
const QuizEntrySchema = new Schema({
  studentId: Schema.Types.ObjectId,
  quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
  openQuestionPoints: Number,
  closedQuestionPoints: Number,
  totalPoints: Number,
  teacherId: Schema.Types.ObjectId,
  date: Date,
  pass: Boolean,
});

const QuizEntry =
  mongoose.models.QuizEntry || mongoose.model("QuizEntry", QuizEntrySchema);

// Exam model
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

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);

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
  QuizEntry,
  Quiz,
  News,
  PointsCommissionDecision,
  News,
  Category,
  RegistrationCode,
  Family,
};
