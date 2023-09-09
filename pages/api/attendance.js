import dbConnect from "@/data/mongoDb/database";
import { Student } from "@/data/mongoDb/models";
import { Attendance } from "@/data/mongoDb/models";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        // Destructure the request body
        const {
          studentId,
          attendance: key, // Destructured directly to 'key' to match your schema
          date = new Date(), // Default value is the current date
          subjectId,
        } = req.body;

        // Input validation
        if (!studentId || key === undefined || !subjectId) {
          return res.status(400).json({
            success: false,
            error: "Required data missing in the request body.",
          });
        }

        // Fetch the student using the provided ID
        const student = await Student.findById(studentId, "classIds");
        if (!student) {
          return res.status(404).json({
            success: false,
            error: "Student not found.",
          });
        }

        // Create a new attendance record, using the provided data
        const newAttendance = await Attendance.create({
          key: key,
          date: date,
          subject: subjectId, // Now storing subjectId
        });

        // Update the student record with the new attendance ID
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

        // Respond with success
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
