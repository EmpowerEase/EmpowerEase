import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { breakDuration, preferredBreakTime } = req.body;

      // Create a new user in the database
      const newUser = await prisma.user.create({
        data: {
          breakDuration,
          preferredBreakTime,
          userId: 1,
        },
      });

      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
