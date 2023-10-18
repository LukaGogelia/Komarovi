import dbConnect from "./mongoDb/utils/database";
import Student from "./mongoDb/models/student";
import PointsCommissionDecision from "./mongoDb/models/pointsCommissionDecision";
export async function fetchGradesData(dashboardText) {
  try {
    await dbConnect();

    const studentId = "64e52ffb1436edfda9379761";

    // Populate both the receivedGrade and the subject inside it
    const student = await Student.findOne({ _id: studentId })
      .populate({
        path: "receivedGrade",
        populate: {
          path: "subject",
        },
      })
      .exec();

    const pointsDecisions = await PointsCommissionDecision.find({
      _id: { $in: student.pointsCommissionDecision },
    });

    let personalPoints = 0;
    let obtainedPointsForHouse = 0;

    pointsDecisions.forEach((decision) => {
      personalPoints += Math.round(decision.pointsAwarded * 0.15);
      obtainedPointsForHouse += Math.round(decision.pointsAwarded * 0.85);
    });

    const gradeCounts = new Array(10).fill(0);
    const gradeNames = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];

    const gradeEntries = student.receivedGrade;

    if (gradeEntries && Array.isArray(gradeEntries)) {
      gradeEntries.forEach((entry) => {
        const grade = entry.grade;

        if (grade >= 1 && grade <= 10) {
          gradeCounts[10 - grade]++;
        }
      });

      const gradeList = gradeCounts.map((count, index) => ({
        name: gradeNames[9 - index],
        value: count,
      }));

      // Deduplicate subjects by name
      const uniqueSubjectNames = [
        ...new Set(
          gradeEntries
            .filter((entry) => entry && entry.subject) // Ensure both entry and entry.subject are defined
            .map((entry) => entry.subject.subject)
        ),
      ];
      const subjectList = uniqueSubjectNames.map((subjectName) => ({
        label: subjectName,
      }));

      return {
        subjectList,
        gradeList,
        gradeEntries,
        states: [
          {
            id: 1,
            title: dashboardText.ObtainedPoints,
            value: obtainedPointsForHouse,
            iconClass: "icon-coupon",
          },
          {
            id: 2,
            title: dashboardText.PersonalPoints,
            value: personalPoints,
            iconClass: "icon-play-button",
          },
          {
            id: 3,
            title: dashboardText.TotalStudents,
            value: 129786,
            iconClass: "icon-graduate-cap",
          },
          {
            id: 4,
            title: dashboardText.TotalInstructors,
            value: 22786,
            iconClass: "icon-online-learning",
          },
        ],
      };
    }
  } catch (error) {
    console.error("Error fetching grades data:", error);
    throw error;
  }
}
