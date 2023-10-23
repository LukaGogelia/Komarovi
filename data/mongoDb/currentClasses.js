import CurrentClass from "./models/currentClass";
import dbConnect from "./utils/database";

const isValidAcademicYear = (year) => {
  const regex = /^\d{4}-\d{4}$/;
  if (!regex.test(year)) return false;

  const startYear = parseInt(year.substr(0, 4));
  const endYear = parseInt(year.substr(5, 4));
  return endYear - startYear === 1;
};

export const getCurrentClassesByYear = async (academicYear) => {
  await dbConnect();

  // Validate the academicYear format
  if (!isValidAcademicYear(academicYear)) {
    throw new Error("Invalid academic year format.");
  }

  try {
    console.log(academicYear);
    const currentClasses = await CurrentClass.find(
      { academicYear },
      { gradeLevel: 1, parallelNumber: 1, _id: 0 }
    );
    if (currentClasses.length === 0) {
      throw new Error("No classes found for the given academic year.");
    }
    return currentClasses;
  } catch (error) {
    throw new Error("Failed to fetch classes: " + error.message);
  }
};
