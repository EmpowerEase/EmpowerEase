import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { taskId } = req.body;

      // Check if the task exists
      const existingTask = await prisma.goal.findUnique({
        where: { id: taskId },
      });

      if (!existingTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Update the task to mark it as completed
      await prisma.goal.update({
        where: { id: taskId },
        data: { isCompleted: true },
      });

      // Return the updated task status
      res.status(200).json({ taskId, status: "completed" });
    } catch (error) {
      console.error("Request error", error);
      res
        .status(500)
        .json({ error: "Error updating task", errorMessage: error.message });
    }
  } else {
    // If the request method is not PUT
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
