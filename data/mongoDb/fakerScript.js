const mongoose = require("mongoose");
const faker = require("faker");
const {
  User,
  Club,
  House,
  GradeEntry,
  ExamEntry,
  Exam,
  PointsCommissionDecision,
} = require("./models.js"); // Update with the path to your models file

async function generateData() {
  await mongoose.connect("mongodb://127.0.0.1:27017/komarovi"); // Adjust the connection string

  const students = [];
  const teachers = [];

  // Generate 50 students and 10 teachers for demonstration:
  for (let i = 0; i < 50; i++) {
    const student = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      roles: ["student"],
    });
    await student.save();
    students.push(student);
  }

  for (let i = 0; i < 10; i++) {
    const teacher = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      roles: ["teacher"],
    });
    await teacher.save();
    teachers.push(teacher);
  }

  // Generate 5 Clubs
  for (let i = 0; i < 5; i++) {
    const club = new Club({
      name: faker.company.companyName(),
      description: faker.lorem.sentence(),
      presidentId: students[faker.random.number({ min: 0, max: 49 })]._id,
      members: [
        students[faker.random.number({ min: 0, max: 49 })]._id,
        students[faker.random.number({ min: 0, max: 49 })]._id,
      ],
    });
    await club.save();
  }

  // Generate 4 Houses
  for (let i = 0; i < 4; i++) {
    const house = new House({
      name: faker.address.city(),
      description: faker.lorem.sentence(),
      mentorId: teachers[faker.random.number({ min: 0, max: 9 })]._id,
      leaderId: students[faker.random.number({ min: 0, max: 49 })]._id,
      members: [
        students[faker.random.number({ min: 0, max: 49 })]._id,
        students[faker.random.number({ min: 0, max: 49 })]._id,
      ],
    });
    await house.save();
  }

  // Generate 100 GradeEntries
  for (let i = 0; i < 100; i++) {
    const gradeEntry = new GradeEntry({
      studentId: students[faker.random.number({ min: 0, max: 49 })]._id,
      teacherId: teachers[faker.random.number({ min: 0, max: 9 })]._id,
      subject: faker.random.word(),
      grade: faker.random.number({ min: 1, max: 100 }),
      type: faker.random.word(),
      date: faker.date.past(1),
    });
    await gradeEntry.save();
  }

  // Generate 10 Exams and 50 ExamEntries
  for (let i = 0; i < 10; i++) {
    const exam = new Exam({
      subject: faker.random.word(),
      gradeLevel: faker.random.number({ min: 1, max: 12 }),
      totalPoints: 100,
      passPoints: 50,
      closedQuestions: {
        count: 10,
        pointsEach: 5,
      },
      openQuestions: {
        count: 2,
        pointsEach: 25,
      },
      date: faker.date.future(0.5),
      type: faker.random.word(),
      participants: 50,
      passCount: 25,
    });
    await exam.save();

    // For each exam, generate 5 exam entries
    for (let j = 0; j < 5; j++) {
      const examEntry = new ExamEntry({
        studentId: students[faker.random.number({ min: 0, max: 49 })]._id,
        examId: exam._id,
        openQuestionPoints: faker.random.number({ min: 0, max: 50 }),
        closedQuestionPoints: faker.random.number({ min: 0, max: 50 }),
        totalPoints: faker.random.number({ min: 0, max: 100 }),
        teacherId: teachers[faker.random.number({ min: 0, max: 9 })]._id,
        date: faker.date.past(1),
        pass: faker.random.boolean(),
      });
      await examEntry.save();
    }
  }

  // Generate 20 PointsCommissionDecisions
  for (let i = 0; i < 20; i++) {
    const decision = new PointsCommissionDecision({
      studentId: students[faker.random.number({ min: 0, max: 49 })]._id,
      description: faker.lorem.sentence(),
      submittedBy: teachers[faker.random.number({ min: 0, max: 9 })]._id,
      pointsAwarded: faker.random.number({ min: 1, max: 10 }),
      date: faker.date.past(1),
      status: ["pending", "approved", "rejected", "reviewed"][
        faker.random.number({ min: 0, max: 3 })
      ],
    });
    await decision.save();
  }

  console.log("Data generation complete!");

  mongoose.disconnect();
}

generateData();
