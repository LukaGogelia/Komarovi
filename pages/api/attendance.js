import dbConnect from "@/data/mongoDb/utils/database";
import Attendance from "@/data/mongoDb/models/attendance";
import mongoose from "mongoose";
import Student from "@/data/mongoDb/models/student";
import autoFillAttendanceForDate from "@/data/autoFillAttendance";
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
        console.error("Error trace:", error.stack);
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

        console.log("Request body:", req.body); // Logging the request body for debugging

        if (!studentId) {
          return res.status(400).json({
            success: false,
            error: "studentId missing in the request body.",
          });
        }

        if (!subjectId) {
          return res.status(400).json({
            success: false,
            error: "subjectId missing or undefined in the request body.",
          });
        }

        const student = await Student.findById(studentId, "classIds");
        if (!student) {
          return res
            .status(404)
            .json({ success: false, error: "Student not found." });
        }

        const existingAttendance = await Attendance.findOne({
          student: studentId,
          date: new Date(date).toISOString().split("T")[0],
        });

        if (existingAttendance) {
          return res.status(400).json({
            success: false,
            error:
              "Attendance record already exists for the given student and date.",
          });
        }

        const yesterday = new Date(date);
        yesterday.setDate(yesterday.getDate() - 1);
        await autoFillAttendanceForDate(yesterday);

        const attendanceKey = key !== undefined ? key : "yes";

        const newAttendance = await Attendance.create({
          key: attendanceKey,
          date: date,
          subject: subjectId,
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

    case "PUT":
      try {
        const { attendanceId, key } = req.body;

        if (!attendanceId) {
          return res.status(400).json({
            success: false,
            error: "attendanceId missing in the request body.",
          });
        }

        if (key === undefined) {
          return res.status(400).json({
            success: false,
            error: "New attendance key value missing in the request body.",
          });
        }

        const updatedAttendance = await Attendance.findByIdAndUpdate(
          attendanceId,
          { key: key },
          { new: true }
        );

        if (!updatedAttendance) {
          return res.status(404).json({
            success: false,
            error: "Attendance record not found or update failed.",
          });
        }

        return res.status(200).json({
          success: true,
          data: updatedAttendance,
        });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: error.message });
      }

    default:
      res.set("Allow", ["GET", "POST", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
