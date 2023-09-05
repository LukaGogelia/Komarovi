import dbConnect from "@/data/mongoDb/database";
import { Teacher } from "@/data/mongoDb/models";
import { Student } from "@/data/mongoDb/models";
import { Attendance } from "@/data/mongoDb/models";

const HARDCODED_TEACHER_ID = "64e8d8e05ab36dd9eb96add1";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { studentId, key, date = new Date().toISOString() } = req.body;

        if (!studentId || key === undefined) {
          return res.status(400).json({
            success: false,
            error: "Required data missing in the request body.",
          });
        }

        const teacher = await Teacher.findById(HARDCODED_TEACHER_ID);
        if (!teacher) {
          throw new Error("Specified teacher not found.");
        }

        const student = await Student.findById(studentId, "classIds");
        if (!student) {
          return res.status(404).json({
            success: false,
            error: "Student not found.",
          });
        }

        const teachesStudent = teacher.classTaught.some((classTeaching) =>
          student.classIds.includes(classTeaching.classId.toString())
        );

        if (!teachesStudent) {
          return res.status(403).json({
            success: false,
            error: "Teacher doesn't teach this student.",
          });
        }

        let isPresent = key !== "no";

        const newAttendance = await Attendance.create({
          isPresent: isPresent,
          date: date,
        });

        const updatedStudent = await Student.findByIdAndUpdate(
          studentId,
          { $push: { attendanceIds: newAttendance._id } },
          { new: true }
        );

        if (!updatedStudent) {
          return res.status(400).json({
            success: false,
            error: "Error updating student data.",
          });
        }

        return res.status(200).json({
          success: true,
          data: {
            attendance: newAttendance,
            updatedStudent,
          },
        });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

    default:
      res.set("Allow", ["POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
