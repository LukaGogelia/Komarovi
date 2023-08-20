const mongoose = require("mongoose");
const faker = require("faker");
const { Subject } = require("./models"); // Adjust the path to match your project structure

// Connect to your MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/komarovi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define subjects you want to create
const subjects = Array.from({ length: 10 }, () => ({
  name: faker.random.words(2), // This will generate a random subject name
}));

// Create subjects in the database
Subject.insertMany(subjects)
  .then(() => {
    console.log("Successfully inserted subjects");
    mongoose.disconnect(); // Disconnect when done
  })
  .catch((error) => {
    console.error("An error occurred:", error);
    mongoose.disconnect(); // Disconnect in case of an error
  });
