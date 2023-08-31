// pages/api/teacher/grade.js
import dbConnect from "@/data/mongoDb/database";
import { Teacher } from "@/data/mongoDb/models";
import { Student } from "@/data/mongoDb/models";
import { GradeEntry } from "@/data/mongoDb/models"; // Importing the GradeEntry model

// Hardcoded teacher ID
const HARDCODED_TEACHER_ID = "64e8d8e05ab36dd9eb96add1";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        // Get data from request body
        const { studentId, subject, grade, type, date } = req.body;

        if (!studentId || !subject || grade === undefined || !type || !date) {
          return res
            .status(400)
            .json({ success: false, error: "Data missing" });
        }

        // Find teacher by hardcoded ID
        const teacher = await Teacher.findById(HARDCODED_TEACHER_ID);
        console.log("Teacher:", teacher); // <-- Debug Log

        // Check if teacher teaches the student
        const studentClassId = await Student.findById(studentId, "classIds");
        console.log("StudentClassId:", studentClassId); // <-- Debug Log

        const teachesStudent = teacher.classTaught.some((classTeaching) =>
          studentClassId.classIds.includes(classTeaching.classId.toString())
        );

        if (!teachesStudent) {
          return res.status(400).json({
            success: false,
            error: "Teacher doesn't teach this student",
          });
        }

        // Create a new GradeEntry
        const newGradeEntry = await GradeEntry.create({
          subject,
          grade,
          type,
          date,
        });
        console.log("New GradeEntry:", newGradeEntry); // <-- Debug Log

        // Add the new GradeEntry to the student's receivedGrade array
        const updatedStudent = await Student.findByIdAndUpdate(
          studentId,
          {
            $push: { receivedGrade: newGradeEntry._id },
          },
          { new: true }
        );
        console.log("Updated Student:", updatedStudent); // <-- Debug Log

        if (!updatedStudent) {
          return res
            .status(400)
            .json({ success: false, error: "Failed to update student grade" });
        }

        return res.status(200).json({ success: true, data: updatedStudent });
      } catch (error) {
        console.error("Error:", error); // <-- Debug Log
        return res.status(500).json({ success: false, error: "Server Error" });
      }
      break;

    default:
      res.set("Allow", ["POST"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
