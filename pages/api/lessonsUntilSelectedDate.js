import dbConnect from "@/data/mongoDb/database";
import { TimeTable } from "@/data/mongoDb/models"; // You need to have a model for TimeTable

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // Extract date from query
        const { date } = req.query;

        // If date not provided, return an error
        if (!date) {
          return res
            .status(400)
            .json({ success: false, error: "Date missing in query" });
        }

        // Convert the provided date to its respective day
        const days = [
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ];
        const selectedDay = days[new Date(date).getDay()];

        // Query the database for timetable entries associated with that day
        const timeTableEntries = await TimeTable.find({ day: selectedDay });

        // Group by lesson name to see if there are multiple of the same lessons
        let lessonGroups = {};
        timeTableEntries.forEach((entry) => {
          if (!lessonGroups[entry.lesson]) {
            lessonGroups[entry.lesson] = 1;
          } else {
            lessonGroups[entry.lesson]++;
          }
        });

        // Filter lessons that have counts greater than 1
        let multipleLessons = Object.keys(lessonGroups).filter(
          (lesson) => lessonGroups[lesson] > 1
        );

        return res
          .status(200)
          .json({ success: true, multipleLessons: multipleLessons });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
      }

    default:
      res.set("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
