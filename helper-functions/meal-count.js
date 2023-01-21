const getBreakfastFromMealEntries = (mealEntries) =>
  mealEntries.filter((item) => item.Meal === "Breakfast").length;

export const mealCount = (mealEntriesPerEmail) => {
  if (!mealEntriesPerEmail) {
    return [0, 0, 0];
  }
  const breakfast = getBreakfastFromMealEntries(mealEntriesPerEmail);

  const lunch = mealEntriesPerEmail.filter(
    (item) => item.Meal === "Lunch"
  ).length;

  const supper = mealEntriesPerEmail.filter(
    (item) => item.Meal === "Supper"
  ).length;

  return [breakfast, lunch, supper];
};
