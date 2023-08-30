const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const SubjectSchema = new Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);

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
});

const CurrentClass =
  mongoose.models.CurrentClass ||
  mongoose.model("CurrentClass", CurrentClassSchema);

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

const teacherSchema = new mongoose.Schema({
  classTaught: [
    {
      classId: { type: mongoose.Schema.Types.ObjectId, ref: "CurrentClass" },
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    },
  ],
  grade: { type: mongoose.Schema.Types.ObjectId, ref: "GradeEntry" },
  quiz: [{ type: Schema.Types.ObjectId, ref: "QuizEntry" }],
  socialProfile: [
    {
      icon: { type: String },
      url: {
        type: String,
        validate: {
          validator: function (url) {
            return url.includes("facebook") || url.includes("instagram");
          },
          message: (props) => `${props.value} is not a valid URL!`,
        },
      },
    },
  ],
});

teacherSchema.pre("save", function (next) {
  this.socialProfile.forEach((profile) => {
    if (profile.url.includes("facebook")) {
      profile.icon = "icon-facebook";
    } else if (profile.url.includes("instagram")) {
      profile.icon = "icon-instagram";
    }
  });
  next();
});

const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);

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

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  passwordHashed: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  nationalIdNumber: {
    type: String,
    required: true,
    trim: true,
  },
  roles: {
    type: [String],
    required: true,
    enum: [
      "student",
      "teacher",
      "caremanager",
      "admin",
      "parent",
      "commissionmember",
    ],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

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
// const ClubSchema = new Schema({
//   name: String,
//   description: String,
//   presidentId: Schema.Types.ObjectId,
//   members: [Schema.Types.ObjectId],
// });

// const Club = mongoose.models.Club || mongoose.model("Club", ClubSchema);

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
  subject: String,
  grade: Number,
  type: String,
  date: {
    type: Date,
    default: Date.now, // This sets the default value to the current date and time
  },
});

const GradeEntry =
  mongoose.models.GradeEntry || mongoose.model("GradeEntry", GradeEntrySchema);

// Exam Entry model
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

const ClubPresidentSchema = new Schema({
  president: [
    {
      studentId: {
        type: Schema.Types.ObjectId,
        ref: "Student", // Reference to the Student collection
      },
      academicYear: {
        type: Schema.Types.ObjectId,
        ref: "CurrentClass", // Reference to the CurrentClass collection
      },
    },
  ],
});

const ClubPresident =
  mongoose.models.ClubPresident ||
  mongoose.model("ClubPresident", ClubPresidentSchema);

// HouseLeader Schema
const HouseLeaderSchema = new Schema({
  leader: [
    {
      academicYear: { type: Schema.Types.ObjectId, ref: "House" }, // Reference to House collection
    },
  ],
});

const HouseLeader =
  mongoose.models.HouseLeader ||
  mongoose.model("HouseLeader", HouseLeaderSchema);

// Club model
const ClubSchema = new Schema({
  name: String,
  description: String,
  presidentId: Schema.Types.ObjectId,
  members: [Schema.Types.ObjectId],
});

const Club = mongoose.models.Club || mongoose.model("Club", ClubSchema);

const AdminSchema = new Schema({
  permissions: [
    {
      type: String,
    },
  ],
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  dateAssigned: {
    type: Date,
    default: Date.now,
  },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

const CareManagerSchema = new Schema({
  classIds: [
    {
      classId: {
        type: Schema.Types.ObjectId,
        ref: "CurrentClass", // Reference to the Class collection
      },
    },
  ],
});

const CareManager =
  mongoose.models.CareManager ||
  mongoose.model("CareManager", CareManagerSchema);

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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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

const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);

// Export models
module.exports = {
  User,
  Club,
  House,
  GradeEntry,
  QuizEntry,
  Student,
  Quiz,
  News,
  PointsCommissionDecision,
  CurrentClass,
  Category,
  CareManager,
  RegistrationCode,
  Family,
  ClubPresident, // Added export
  HouseLeader,
  Admin,
  Teacher,
  Subject,
};
