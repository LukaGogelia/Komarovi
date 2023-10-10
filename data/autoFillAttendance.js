import dbConnect from "@/data/mongoDb/database";
import { Student } from "@/data/mongoDb/models/student";
import { Attendance } from "@/data/mongoDb/models";

async function autoFillAttendanceForDate(date) {
  await dbConnect();

  const students = await Student.find({});

  for (const student of students) {
    const attendanceData = await Attendance.findOne({
      student: student._id,
      date: new Date(date.toISOString().split("T")[0]),
    });

    if (!attendanceData) {
      await Attendance.create({
        key: "yes",
        date: date,
        student: student._id,
      });
    }
  }
}

export default autoFillAttendanceForDate;
