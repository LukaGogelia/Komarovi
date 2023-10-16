const mongoose = require("mongoose");
const faker = require("faker");
const Attendance = require("../models/attendance"); // Make sure this path is correct

mongoose.connect(
  "mongodb+srv://nikoloz-donadze:xgegs8WanP0Pgcn5@komarovi.276krd8.mongodb.net/test",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const seedAttendance = async (numOfEntries = 10) => {
  const mockData = [];

  for (let i = 0; i < numOfEntries; i++) {
    const date = faker.date.past();
    const key = faker.random.arrayElement(["yes", "no"]);
    const subject = new mongoose.Types.ObjectId(); // This creates a random ObjectId. You might want to fetch actual Subject IDs from your database if they need to be valid references.

    mockData.push({
      date,
      key,
      subject,
    });
  }

  try {
    await Attendance.insertMany(mockData);
    console.log("Successfully inserted mock data for Attendance");
  } catch (error) {
    console.error("Error inserting mock data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedAttendance(20); // This will seed 20 Attendance entries
