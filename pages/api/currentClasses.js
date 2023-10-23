import mongoose from "mongoose";
import CurrentClass from "@/data/mongoDb/models/currentClass";
// Connect to the MongoDB database
import dbConnect from "@/data/mongoDb/utils/database";

export default async (req, res) => {
  await dbConnect();

  const { academicYear } = req.query;

  // Optionally, validate the academicYear format here...

  try {
    const currentClasses = await CurrentClass.find({ academicYear });

    if (currentClasses.length === 0) {
      return res
        .status(404)
        .json({ error: "No classes found for the given academic year." });
    }

    res.status(200).json(currentClasses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classes." });
  }
};
