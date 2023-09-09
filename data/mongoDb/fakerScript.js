const mongoose = require("mongoose");
const faker = require("faker");

// Connect to the database
const MONGODB_URI = "mongodb://127.0.0.1:27017/komarovi";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define GradeEntry and Subject models
const GradeEntrySchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  grade: Number,
  type: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const GradeEntry = mongoose.model("GradeEntry", GradeEntrySchema);

const SubjectSchema = new mongoose.Schema({
  name: String,
  // Assuming 'name' is the main field, add others if needed
});
const Subject = mongoose.model("Subject", SubjectSchema);

async function seedGradeEntries(numEntries = 10) {
  try {
    // Fetch existing Subject _ids
    const subjectIds = await Subject.find().select("_id").lean();

    if (subjectIds.length === 0) {
      console.error(
        "No subjects found. Make sure you have some subjects in your database."
      );
      return;
    }

    const fakeEntries = Array.from({ length: numEntries }).map(() => ({
      subject: faker.random.arrayElement(subjectIds)._id,
      grade: faker.datatype.number({ min: 0, max: 100 }),
      type: faker.random.arrayElement(["exam", "test", "assignment"]),
      date: faker.date.past(1), // Date within the last year
    }));

    await GradeEntry.insertMany(fakeEntries);
    console.log(`Successfully added ${numEntries} fake grade entries.`);
  } catch (error) {
    console.error("Error seeding fake data:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedGradeEntries();
