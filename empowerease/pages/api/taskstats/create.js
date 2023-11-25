// pages/api/taskstats/create.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        date,
        tasksCompletedToday,
        tasksNotCompletedToday,
        completedOnTime,
        neededMoreTime,
        completedEarly,
        userId,
      } = req.body;

      // Validate the userId and date fields
      if (!userId || !date) {
        return res.status(400).json({ error: "userId and date are required" });
      }

      // Create a new TaskStats record
      const newTaskStats = await prisma.taskStats.create({
        data: {
          date: new Date(date),
          completedTasks: tasksCompletedToday,
          pendingTasks: tasksNotCompletedToday,
          completedOnTime,
          neededMoreTime,
          completedEarly,
          userId,
        },
      });

      return res.status(200).json(newTaskStats);
    } catch (error) {
      console.error("Request error", error);
      res
        .status(500)
        .json({
          error: "Error creating task stats",
          errorMessage: error.message,
        });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
