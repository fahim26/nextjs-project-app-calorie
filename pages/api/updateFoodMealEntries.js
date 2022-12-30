import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method dis-allowed" });
  }

  try {
    const JsonData = JSON.parse(req.body);
    const { apiType, ...data } = JsonData;
    const { calorieValue, ...rest } = data;
    const c = parseInt(calorieValue);
    if (apiType === "admin") {
      const newDataFoodEntry = await prisma.FoodEntry.update({
        where: { id: data.id },
        data: { ...rest, calorieValue: c },
      });
      res.send(newDataFoodEntry);
    } else if (apiType === "user") {
      const newDataMealEntry = await prisma.MealEntry.update({
        where: { id: data.id },
        data: { ...rest, calorieValue: c },
      });
      res.send(newDataMealEntry);
    }

  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
