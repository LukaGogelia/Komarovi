import dbConnect from "@/data/mongoDb/database";
import { FamilyRelation } from "@/data/mongoDb/models";

export default async function getFamilyName(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { firstName, lastName, role } = req.body;

  let query = {};

  switch (role) {
    case "mother":
      query = {
        "mother.firstName": firstName,
        "mother.lastName": lastName,
        "mother.familyPosition": "mother",
      };
      break;
    case "father":
      query = {
        "father.firstName": firstName,
        "father.lastName": lastName,
        "father.familyPosition": "father",
      };
      break;
    case "child":
      query = {
        "children.firstName": firstName,
        "children.lastName": lastName,
        "children.familyPosition": "child",
      };
      break;
    default:
      return res.status(400).json({ message: "Invalid role provided." });
  }

  try {
    await dbConnect();

    // Using find() to get all matching families
    const families = await FamilyRelation.find(query);

    if (families.length === 0) {
      return res.status(404).json({ message: "Families not found." });
    }

    // Returning the count of matching families and the array of families
    return res.status(200).json({
      count: families.length,
      families: families,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}
