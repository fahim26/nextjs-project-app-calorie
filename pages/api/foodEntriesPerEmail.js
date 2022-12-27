import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method dis-allowed" });
  }

  try {
    const foodEntriesPerEmail = await prisma.FoodEntry.findMany({
      where: {
        userEmail: req.query.userEmail,
      },
    });
    res.status(200).json(foodEntriesPerEmail);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
