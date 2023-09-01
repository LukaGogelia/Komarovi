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
        const { studentId, subject, grade, type, date } = req.body;

        if (!studentId || !subject || grade === undefined || !type || !date) {
          return res
            .status(400)
            .json({ success: false, error: "Data missing" });
        }

        const teacher = await Teacher.findById(HARDCODED_TEACHER_ID);
        console.log("Teacher:", teacher);

        const studentClassId = await Student.findById(studentId, "classIds");
        console.log("StudentClassId:", studentClassId);

        const teachesStudent = teacher.classTaught.some((classTeaching) =>
          studentClassId.classIds.includes(classTeaching.classId.toString())
        );

        if (!teachesStudent) {
          return res.status(400).json({
            success: false,
            error: "Teacher doesn't teach this student",
          });
        }

        const newGradeEntry = await GradeEntry.create({
          subject,
          grade,
          type,
          date,
        });
        console.log("New GradeEntry:", newGradeEntry);

        const updatedStudent = await Student.findByIdAndUpdate(
          studentId,
          {
            $push: { receivedGrade: newGradeEntry._id },
          },
          { new: true }
        );
        console.log("Updated Student:", updatedStudent);

        if (!updatedStudent) {
          return res
            .status(400)
            .json({ success: false, error: "Failed to update student grade" });
        }

        return res.status(200).json({ success: true, data: updatedStudent });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
      }

    case "DELETE":
      console.log(req.body); // <-- Add this line

      try {
        // Extract data from request body
        const { entryId, studentId } = req.body;

        // Check if both entryId and studentId are provided
        if (!entryId) {
          return res
            .status(400)
            .json({ success: false, error: "Entry ID missing" });
        }
        if (!studentId) {
          return res
            .status(400)
            .json({ success: false, error: "Student ID missing" });
        }

        // Find and remove the grade entry
        await GradeEntry.findByIdAndDelete(entryId);

        // Remove the entryId reference from the student's receivedGrade array
        await Student.findByIdAndUpdate(studentId, {
          $pull: { receivedGrade: entryId },
        });

        return res
          .status(200)
          .json({ success: true, message: "Entry successfully deleted" });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
      }

    default:
      res.set("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
