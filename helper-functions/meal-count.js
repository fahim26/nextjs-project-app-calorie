const getMealCount = (mealEntriesPerEmail, mealName) => {
  const meal_count = mealEntriesPerEmail.filter(
    (item) => item.Meal === mealName
  ).length;
  return meal_count;
};

export const mealCount = (mealEntriesPerEmail) => {
  if (!mealEntriesPerEmail) {
    return [0, 0, 0];
  }
  const breakfastCount = getMealCount(mealEntriesPerEmail, "Breakfast");
  const lunchCount = getMealCount(mealEntriesPerEmail, "Lunch");
  const supperCount = getMealCount(mealEntriesPerEmail, "Supper");
  return [breakfastCount, lunchCount, supperCount];
};
