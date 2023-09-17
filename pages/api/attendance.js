import dbConnect from "@/data/mongoDb/database";
import { Student } from "@/data/mongoDb/models";
import { Attendance } from "@/data/mongoDb/models";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { studentId, date = new Date().toISOString().split("T")[0] } =
          req.query;

        if (!studentId) {
          return res.status(400).json({
            success: false,
            error: "studentId is missing in the request query.",
          });
        }

        // Fetching the student's attendanceIds
        const student = await Student.findById(studentId);
        if (
          !student ||
          !student.attendanceIds ||
          student.attendanceIds.length === 0
        ) {
          return res.status(404).json({
            success: false,
            error: "No attendance records found for the given student.",
          });
        }

        // Fetching the attendance data for the student on the given date
        const attendanceData = await Attendance.find({
          _id: { $in: student.attendanceIds },
          date: new Date(date), // Assuming the date format matches the stored format
        }).populate("subject");

        if (!attendanceData || attendanceData.length === 0) {
          return res.status(404).json({
            success: false,
            error: "Attendance data not found for the given date.",
          });
        }

        return res.status(200).json({
          success: true,
          data: attendanceData,
        });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

    case "POST":
      try {
        const {
          studentId,
          attendance: key,
          date = new Date(),
          subjectId,
        } = req.body;

        if (!studentId) {
          return res.status(400).json({
            success: false,
            error: "studentId missing in the request body.",
          });
        }

        if (key === undefined) {
          return res.status(400).json({
            success: false,
            error: "attendance key missing in the request body.",
          });
        }

        if (!subjectId) {
          return res.status(400).json({
            success: false,
            error: "subjectId missing in the request body.",
          });
        }

        const student = await Student.findById(studentId, "classIds");
        if (!student) {
          return res.status(404).json({
            success: false,
            error: "Student not found.",
          });
        }

        const newAttendance = await Attendance.create({
          key: key,
          date: date,
          subject: subjectId,
          student: studentId, // assuming you have a "student" field in Attendance model
        });

        const updatedStudent = await Student.findByIdAndUpdate(
          studentId,
          { $push: { attendanceIds: newAttendance._id } },
          { new: true }
        );

        if (!updatedStudent) {
          return res.status(400).json({
            success: false,
            error: "Error updating student data with new attendance record.",
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
      res.set("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
