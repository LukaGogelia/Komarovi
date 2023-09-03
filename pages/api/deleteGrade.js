import dbConnect from "@/data/mongoDb/database";
import { Teacher } from "@/data/mongoDb/models";
import { Student } from "@/data/mongoDb/models";
import { GradeEntry } from "@/data/mongoDb/models";

export default async function deleteHandler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      console.log("Received Request Body:", req.body);

      try {
        const { entryId, studentId } = req.body;

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

        // Ensure the grade entry exists before deleting
        const deletedEntry = await GradeEntry.findByIdAndDelete(entryId);
        if (!deletedEntry) {
          return res
            .status(404)
            .json({ success: false, error: "Grade entry not found" });
        }
        console.log("Deleted Grade Entry:", deletedEntry);

        // Remove the entryId reference from the student's receivedGrade array
        const updatedStudent = await Student.findByIdAndUpdate(studentId, {
          $pull: { receivedGrade: entryId },
        });
        if (!updatedStudent) {
          return res
            .status(404)
            .json({ success: false, error: "Student not found" });
        }
        console.log("Updated Student after deletion:", updatedStudent);

        return res
          .status(200)
          .json({ success: true, message: "Entry successfully deleted" });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
      }

    case "PUT":
      try {
        const { entryId, gradeValue, gradeType } = req.body;

        if (!entryId) {
          return res
            .status(400)
            .json({ success: false, error: "Entry ID missing" });
        }

        // We'll build an update object based on the provided fields.
        let updateObject = {};
        if (gradeValue !== undefined) updateObject.grade = gradeValue;
        if (gradeType !== undefined) updateObject.gradeType = gradeType;

        if (Object.keys(updateObject).length === 0) {
          return res
            .status(400)
            .json({ success: false, error: "No fields provided for update" });
        }

        // Update the grade entry using the constructed update object.
        const updatedEntry = await GradeEntry.findByIdAndUpdate(
          entryId,
          updateObject,
          { new: true }
        );

        if (!updatedEntry) {
          return res
            .status(404)
            .json({ success: false, error: "Grade entry not found" });
        }

        console.log("Updated Grade Entry:", updatedEntry);

        return res
          .status(200)
          .json({ success: true, message: "Entry successfully updated" });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
      }

    default:
      res.set("Allow", ["POST", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
