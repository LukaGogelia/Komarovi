const mongoose = require("mongoose");
const faker = require("faker");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/komarovi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isPresent: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);

async function generateFakeData(numRecords = 100) {
  const attendances = [];

  for (let i = 0; i < numRecords; i++) {
    attendances.push({
      date: faker.date.recent(365), // Generate a random date from the last 365 days
      isPresent: faker.random.boolean(), // Generate a random boolean value
    });
  }

  try {
    await Attendance.insertMany(attendances);
    console.log(`Inserted ${numRecords} fake attendance records successfully.`);
  } catch (error) {
    console.error("Error inserting data:", error);
  }

  mongoose.connection.close();
}

generateFakeData();
