import axios from "axios";

const saveFoodEntry = async (
  dataWithUpdatedTime,
  { mutateFoodPerEmail },
  sessionUser,
  { setSnackbar }
) => {
  const new_data = {
    id: "",
    userEmail: sessionUser.email,
    ...dataWithUpdatedTime,
  };

  // api call for adding new food entry with optimistic update
  await mutateFoodPerEmail(
    async (foodEntries) => {
      const { id, ...dataWithoutId } = new_data;

      try {
        const responseFromApi = await axios.post("/api/userFoodEntry", {
          data: dataWithoutId,
        });
        const addedRow = responseFromApi.data;
        setSnackbar({
          children: "Entry successfully saved",
          severity: "success",
        });
        return [...foodEntries, addedRow];
      } catch (e) {
        console.log(e);
      }
    },

    { revalidate: true }
  );
};

export const handleFoodAddition = (
  values,
  { resetForm },
  { mutateFoodPerEmail },
  sessionUser,
  { setSnackbar }
) => {
  const { takenAt, calorieValue, ...restData } = values;
  const calValueInt = parseInt(calorieValue);
  const { mealName, ...exceptMeal } = restData;
  const timeUnix = new Date(String(takenAt));
  const UpdatedTime = timeUnix.getTime() / 1000;
  const dataWithUpdatedTime = {
    ...restData,
    calorieValue: calValueInt,
    takenAt: UpdatedTime,
  };

  saveFoodEntry(dataWithUpdatedTime, { mutateFoodPerEmail }, sessionUser, {
    setSnackbar,
  });
  resetForm();
};
