export const processRowUpdate = async (
  newRow,
  setAddedRows,
  emailUser,
  mutateEntry,
  setSnackbar
) => {
  const timeUnix = new Date(String(newRow.takenAt));
  const UpdatedTime = timeUnix.getTime() / 1000;
  const updatedRow = {
    ...newRow,
    takenAt: UpdatedTime,
    userEmail: emailUser,
    isNew: false,
  };
  const { isNew, ...resp } = updatedRow;
  const { id, ...rowDB } = resp;

  if (newRow.Meal === "Select Meal") {
    setSnackbar({
      children: "Meal Field cannot be empty",
      severity: "warning",
    });
  } else {
    if (newRow.isNew === true) {
      await mutateEntry(
        async (foodRows) => {
          const updatedRes = await fetch("/api/mealEntryAdd", {
            method: "POST",
            body: JSON.stringify(rowDB),
          });
          const addedRow = await updatedRes.json();
          setAddedRows();

          return [...foodRows, addedRow];
        },
        { revalidate: false }
      );

      setSnackbar({
        children: "User successfully saved",
        severity: "success",
      });

      return resp;
    } else {
      const dataWithAPItype = { ...resp, apiType: "user" };
      await mutateEntry(
        async (foodRows) => {
          const dataFromApi = await fetch("/api/updateFoodMealEntries", {
            method: "PUT",
            body: JSON.stringify(dataWithAPItype),
          });
          const updateRow = await dataFromApi.json();

          const filteredRows = foodRows.filter((row) => row.id !== id);

          return [...filteredRows, updateRow];
        },
        { revalidate: false }
      );

      return resp;
    }
  }
};
