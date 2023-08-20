const mongoose = require("mongoose");
const faker = require("faker");
const Schema = mongoose.Schema;

// Define the User Schema
const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  nationalIdNumber: String,
  roles: [String],
  houseId: Schema.Types.ObjectId,
  clubIds: [Schema.Types.ObjectId],
  classId: [
    {
      classId: Schema.Types.ObjectId,
      academicYear: String,
    },
  ],
  classTaught: [Schema.Types.ObjectId],
  classParticipant: [Schema.Types.ObjectId],
  classTakeCareOf: Schema.Types.ObjectId,
});
const User = mongoose.model("User", UserSchema);

async function connectToDb() {
  await mongoose.connect("mongodb://127.0.0.1:27017/komarovi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function createRandomUsers() {
  const roles = ["student", "teacher"];

  for (let i = 0; i < 100; i++) {
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    const user = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      nationalIdNumber: faker.datatype.uuid(),
      roles: [randomRole],
      houseId: new mongoose.Types.ObjectId(),
      clubIds: [new mongoose.Types.ObjectId()],
      classId: [
        {
          classId: new mongoose.Types.ObjectId(),
          academicYear: faker.date
            .between("2020-01-01", "2021-12-31")
            .getFullYear()
            .toString(), // Example academic year
        },
      ],
      classTaught:
        randomRole === "teacher" ? [new mongoose.Types.ObjectId()] : [],
      classParticipant:
        randomRole === "student" ? [new mongoose.Types.ObjectId()] : [],
      classTakeCareOf:
        randomRole === "teacher" ? new mongoose.Types.ObjectId() : null,
    });

    try {
      await user.save();
      console.log(`User ${i + 1} created successfully!`);
    } catch (error) {
      console.error(`Failed to create user ${i + 1}:`, error);
    }
  }

  await mongoose.disconnect();
  console.log("Database connection closed.");
}

connectToDb().then(createRandomUsers);
