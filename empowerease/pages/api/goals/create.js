import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { summary, estimatedTimeHours, deadline } = req.body;

      if (typeof estimatedTimeHours !== "number") {
        return res.status(400).json({
          error: "Invalid data",
          message: "Estimated time hours must be a number.",
        });
      }

      const newTask = await prisma.goal.create({
        data: {
          summary,
          estimatedTime: estimatedTimeHours,
          deadline: new Date(deadline),
          userId: "6562278547d069cf4f00b7db",
          isCompleted: false, // Assuming all new tasks are initially not completed
        },
      });

      return res.status(200).json({
        goalId: newTask.id,
        summary: newTask.summary,
        estimatedTimeHours: newTask.estimatedTime,
        deadline: newTask.deadline,
        status: newTask.isCompleted ? "completed" : "pending",
      });
    } catch (error) {
      console.error("Request error", error);
      res
        .status(500)
        .json({ error: "Error creating task", errorMessage: error.message });
    }
  } else {
    // If the request method is not POST
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
