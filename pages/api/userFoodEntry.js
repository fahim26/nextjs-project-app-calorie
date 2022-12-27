import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method dis-allowed" });
      }

    try {
      const data = JSON.parse(req.body);
      const d = await prisma.FoodEntry.create({data} );
      res.send(d);
    } catch (e) {
      res.status(500).json({e, message: "Something went wrong when adding food entries" });
    }
  
};
