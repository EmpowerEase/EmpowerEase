import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { taskId, difficulty, debrief } = req.body;

      // Update the task with the debrief information
      const updatedTask = await prisma.goal.update({
        where: { id: taskId },
        data: {
          debrief,
          difficulty,
        },
      });

      // Logic to update the corresponding TaskStats (simplified example)
      // Assuming the userId is available and date is today
      const today = new Date().toISOString().split("T")[0];
      const updatedTaskStats = await prisma.taskStats.findUnique({
        where: {
          userId_date: {
            userId: "6562278547d069cf4f00b7db",
            date: new Date(today),
          },
        },
      });

      if (debrief === "Completed on time") {
        const completedOnTimeNew = updatedTaskStats
          ? updatedTaskStats.completedOnTime + 1
          : 1;

        const updatedTaskStats = await prisma.taskStats.update({
          where: {
            userId: userId,
            date: today,
          },
          data: {
            completedOnTime: completedOnTimeNew,
          },
        });
      } else if (debrief === "Complete early") {
        const completeEarlyNew = updatedTaskStats
          ? updatedTaskStats.completedEarly + 1
          : 1;
        const updatedTaskStats = await prisma.taskStats.update({
          where: {
            userId: userId,
            date: today,
          },
          data: {
            completedEarly: completeEarlyNew,
          },
        });
      } else if (debrief === "Need more time") {
        const neededMoreTimeNew = updatedTaskStats
          ? updatedTaskStats.neededMoreTime + 1
          : 1;
        const updatedTaskStats = await prisma.taskStats.update({
          where: {
            userId: userId,
            date: today,
          },
          data: {
            neededMoreTime: neededMoreTimeNew,
          },
        });
      }
      return res.status(200).json({
        goalId: updatedTask.id,
        difficulty,
        debrief,
        debriefed_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Request error", error);
      res.status(500).json({
        error: "Error updating task debrief",
        errorMessage: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
