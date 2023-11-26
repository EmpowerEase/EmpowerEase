import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, start, end } = req.body;

      const newTask = await prisma.event.create({
        data: {
          title,
          start,
          end,
        },
      });

      return res.status(200).json({
        title: newTask.title,
        start: newTask.start,
        end: newTask.end,
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
