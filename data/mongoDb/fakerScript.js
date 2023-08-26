const mongoose = require("mongoose");
const faker = require("faker");
const Schema = mongoose.Schema;

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/komarovi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Subject Schema
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

// Function to generate fake subjects
async function generateFakeSubjects() {
  const numberOfSubjects = 10; // Adjust this as needed

  for (let i = 0; i < numberOfSubjects; i++) {
    // Generate a random subject name
    const subjectName = faker.lorem.words(2);

    const subject = new Subject({
      subject: subjectName,
    });

    try {
      await subject.save();
    } catch (error) {
      // Handle unique constraint error by skipping this iteration
      if (error.code === 11000) {
        console.warn(`Subject "${subjectName}" already exists. Skipping.`);
        continue;
      }
      console.error("Error generating subject:", error);
    }
  }

  console.log(`${numberOfSubjects} fake subjects generated!`);
}

generateFakeSubjects()
  .then(() => mongoose.connection.close())
  .catch((error) => console.error(error));
