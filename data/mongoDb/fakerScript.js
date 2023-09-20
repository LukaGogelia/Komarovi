const mongoose = require("mongoose");
const faker = require("faker");

const MONGODB_URI = "mongodb://127.0.0.1:27017/komarovi";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Assuming Subject and TimeSlot models have already been defined elsewhere in your code:

const Subject =
  mongoose.models.Subject ||
  mongoose.model(
    "Subject",
    new mongoose.Schema({
      name: String,
    })
  );

const TimeSlot =
  mongoose.models.TimeSlot ||
  mongoose.model(
    "TimeSlot",
    new mongoose.Schema({
      number: Number,
      time: String,
    })
  );

// TimeTable Schema
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
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
    const timeSlotIds = await TimeSlot.find().select("_id").lean();

    if (subjectIds.length === 0 || timeSlotIds.length === 0) {
      console.error(
        "No subjects or time slots found. Make sure you have some subjects and time slots in your database."
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
        timeSlot: faker.random.arrayElement(timeSlotIds)._id,
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
