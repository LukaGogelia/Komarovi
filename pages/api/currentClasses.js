import mongoose from "mongoose";
import { CurrentClass } from "./../../data/mongoDb/models"; // Adjust this import path accordingly

// Connect to the MongoDB database
const connectDb = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async (req, res) => {
  await connectDb();

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
