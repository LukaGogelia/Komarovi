import dbConnect from "@/data/mongoDb/database";
import { FamilyRelation } from "@/data/mongoDb/models/";

export default async function addFamily(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { mother, father, children } = req.body;

  try {
    await dbConnect();

    const newFamily = new FamilyRelation({
      mother,
      father,
      children,
    });

    await newFamily.save();

    return res.status(201).json({ message: "Family added successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
