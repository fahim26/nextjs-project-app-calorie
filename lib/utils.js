function convertDate(food) {
  const { takenAt, ...temp } = food;

  const newTime = new Date(takenAt * 1000);
  const updatedFood = { ...temp, takenAt: newTime.toLocaleString() };
  return updatedFood;
}

export const preprocessFoods = (foods) => {
  return foods?.map((f) => convertDate(f));
};

export const columnsUserFoods = [
  { field: "id", headerName: "ID", width: 75 },
  { field: "foodName", headerName: "Food Name", width: 150 },
  {
    field: "calorieValue",
    headerName: "Calorie Value",
    width: 150,
  },
  { field: "takenAt", headerName: "Date Time", width: 200 },
  { field: "Meal", headerName: "Meal", width: 100 },
];
