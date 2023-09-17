const mongoose = require("mongoose");
const faker = require("faker");

// Connect to the database
const MONGODB_URI = "mongodb://127.0.0.1:27017/komarovi";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Assuming SubjectSchema is already defined
const Subject =
  mongoose.models.Subject ||
  mongoose.model(
    "Subject",
    new mongoose.Schema({
      name: String,
    })
  );

const TimeTableSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },
  lessons: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
      },
      timeSlot: {
        type: String,
        required: true,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const TimeTable =
  mongoose.models.TimeTable || mongoose.model("TimeTable", TimeTableSchema);

async function seedTimeTables(numEntries = 10) {
  try {
    const subjectIds = await Subject.find().select("_id").lean();

    if (subjectIds.length === 0) {
      console.error(
        "No subjects found. Make sure you have some subjects in your database."
      );
      return;
    }

    const fakeTimeTables = Array.from({ length: numEntries }).map(() => ({
      day: faker.random.arrayElement([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ]),
      lessons: Array.from({
        length: faker.datatype.number({ min: 1, max: 5 }),
      }).map(() => ({
        subject: faker.random.arrayElement(subjectIds)._id,
        timeSlot: `${faker.datatype.number({
          min: 8,
          max: 12,
        })}:00 - ${faker.datatype.number({ min: 1, max: 4 })}:00`,
      })),
      date: faker.date.recent(30), // Any date within the last 30 days
    }));

    await TimeTable.insertMany(fakeTimeTables);
    console.log(`Successfully added ${numEntries} fake time tables.`);
  } catch (error) {
    console.error("Error seeding fake data:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedTimeTables();
