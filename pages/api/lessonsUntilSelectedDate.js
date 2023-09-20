import dbConnect from "@/data/mongoDb/database";
import { TimeTable } from "@/data/mongoDb/models"; // Assuming you have a TimeTable model

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

        // Modify query to search for lessons until the specified date
        const targetDate = new Date(date);
        targetDate.setHours(23, 59, 59, 999); // Set time to the end of the day

        const lessons = await TimeTable.find({
          date: {
            $lte: targetDate, // Lessons until the end of the specified date
          },
        });

        // Log fetched lessons for debugging
        console.log("Fetched Lessons:", lessons);

        return res.status(200).json({ success: true, data: lessons });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
      }

    default:
      res.set("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
