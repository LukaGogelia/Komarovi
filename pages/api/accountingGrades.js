import dbConnect from "@/data/mongoDb/database";
import { Teacher } from "@/data/mongoDb/models";
import { Student } from "@/data/mongoDb/models";
import { GradeEntry } from "@/data/mongoDb/models";

const HARDCODED_TEACHER_ID = "64e8d8e05ab36dd9eb96add1";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // Extract date from query
        const { date } = req.query;

        // Log the requested date for debugging purposes
        console.log("Requested Date:", date);

        // If date not provided, return an error
        if (!date) {
          return res
            .status(400)
            .json({ success: false, error: "Date missing in query" });
        }

        // Modify query to search for entries within a date range
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        const gradeEntries = await GradeEntry.find({
          date: {
            $gte: startDate,
            $lt: endDate,
          },
        });

        // Log fetched grade entries for debugging
        console.log("Fetched Grade Entries:", gradeEntries);

        return res.status(200).json({ success: true, data: gradeEntries });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
      }

    case "POST":
      try {
        // Destructure and validate request data with default date as current date
        const {
          studentId,
          subject,
          grade,
          type,
          date = new Date().toISOString(),
        } = req.body;

        if (!studentId || !subject || grade === undefined || !type) {
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

        const newGradeEntry = await GradeEntry.create({
          subject,
          grade,
          type,
          date,
        });

        const updatedStudent = await Student.findByIdAndUpdate(
          studentId,
          { $push: { receivedGrade: newGradeEntry._id } },
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
            gradeEntry: newGradeEntry,
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
