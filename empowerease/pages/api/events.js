// pages/api/tasks/completion-stats.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title } = req.body;
      // Fetch task statistics
      const taskStats = await prisma.event.findMany({
        where: {
          title: title,
        },
      });

      // Format data for the response
      const formmattedEvents = taskStats.map((stat) => ({
        title: stat.title,
        start: stat.start,
        end: stat.end,
      }));

      return res.status(200).json({ data: formmattedEvents });
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({
        error: "Error fetching task completion stats",
        errorMessage: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
