// pages/api/tasks/completion-stats.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch task statistics
      const taskStats = await prisma.taskStats.findMany({
        select: {
          date: true,
          completedOnTime: true,
          neededMoreTime: true,
          completedEarly: true,
        },
        orderBy: {
          date: "asc",
        },
      });

      // Format data for the response
      const formattedStats = taskStats.map((stat) => ({
        date: stat.date.toISOString().split("T")[0], // Format date as 'YYYY-MM-DD'
        completedOnTime: stat.completedOnTime,
        neededMoreTime: stat.neededMoreTime,
        completedEarly: stat.completedEarly,
      }));

      return res.status(200).json({ stats: formattedStats });
    } catch (error) {
      console.error("Request error", error);
      res
        .status(500)
        .json({
          error: "Error fetching task completion stats",
          errorMessage: error.message,
        });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
