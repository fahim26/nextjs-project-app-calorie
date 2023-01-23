export const mealCount = (mealEntriesPerEmail) => {
  const [brkfst, lunch, supper] = [0, 0, 0];
  if (mealEntriesPerEmail) {
    brkfst = mealEntriesPerEmail.filter(
      (item) => item.Meal === "Breakfast"
    ).length;

    lunch = mealEntriesPerEmail.filter((item) => item.Meal === "Lunch").length;

    supper = mealEntriesPerEmail.filter(
      (item) => item.Meal === "Supper"
    ).length;
  }
  return [brkfst, lunch, supper];
};
