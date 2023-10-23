import dbConnect from "@/data/mongoDb/utils/database";
import Attendance from "@/data/mongoDb/models/attendance";
import mongoose from "mongoose";
import Student from "@/data/mongoDb/models/student";
import TimeTable from "@/data/mongoDb/models/timeTable";
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
          attendance: key = "yes",
          date = new Date(),
          subjectId,
          day, // Assuming day is part of the request
        } = req.body;

        if (!studentId || !subjectId || !day) {
          return res.status(400).json({
            success: false,
            error:
              "Required parameters (studentId, subjectId, or day) missing in the request body.",
          });
        }

        const student = await Student.findById(studentId);
        if (!student) {
          return res
            .status(404)
            .json({ success: false, error: "Student not found." });
        }

        const targetDate = new Date(date).toISOString().split("T")[0];

        const timetable = await TimeTable.findOne({ day: day });
        if (!timetable) {
          return res.status(404).json({
            success: false,
            error: "Timetable not found for the specified day.",
          });
        }

        // Calculate the number of lessons of that subject on that day
        const lessonsCount = timetable.lessons.filter(
          (lesson) => String(lesson.subject) === String(subjectId)
        ).length;

        // Debugging logs
        console.log("Number of lessons for subject on this day:", lessonsCount);

        // Calculate how many attendance records already exist for that student, on that date, for that subject
        const existingAttendancesCount = await Attendance.countDocuments({
          student: studentId,
          date: targetDate,
          subject: subjectId,
        });

        // Debugging logs
        console.log("Existing attendance entries:", existingAttendancesCount);

        // Compare lessonsCount with existingAttendancesCount
        if (existingAttendancesCount >= lessonsCount) {
          return res.status(400).json({
            success: false,
            error:
              "Maximum attendance entries for this subject on this day have already been made.",
          });
        }

        let newAttendance = new Attendance({
          key: key,
          date: targetDate,
          subject: subjectId,
          student: studentId,
        });

        await newAttendance.save({ validateBeforeSave: false });

        await Student.findByIdAndUpdate(studentId, {
          $push: { attendanceIds: newAttendance._id },
        });

        return res.status(200).json({
          success: true,
          message: "Attendance recorded successfully.",
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
