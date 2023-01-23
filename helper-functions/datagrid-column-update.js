import { GridRowModes } from "@mui/x-data-grid";

export const handleSaveClick = (id, rowModesModel, setRowModesModel) => () => {
  setRowModesModel({ [id]: { mode: GridRowModes.View } });
};

export const handleEditClick =
  (id, rowModesModel, setRowModesModel, addedRows) => async () => {
    if (
      Object.keys(rowModesModel).length === 0 &&
      typeof addedRows == "undefined"
    ) {
      setRowModesModel({ [id]: { mode: GridRowModes.Edit } });
    }
  };

export const handleDeleteClick = (id, mutateMeal, mealRows) => async () => {
  const filteredRows = mealRows.filter((row) => row.id !== id)
  try {
    const filteredRowsAfterDelete = await mutateMeal(
      async (filteredRows) => {
        await fetch("/api/mealEntryAdd", {
          method: "PUT",
          body: JSON.stringify(id),
        });
        return filteredRows;
      },
      {
        optimisticData: filteredRows,
        rollbackOnError: true,
      }
    );
    return filteredRowsAfterDelete;
  } catch (e) {
    console.log(e);
  }

};


export const handleCancelClick =
  (id, rowModesModel, setRowModesModel, setAddedRows, mealRows, mutateMeal) =>
  async () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    setAddedRows();
  const editedRow = mealRows?.find((row) => row.id === id);
  if (editedRow?.isNew) {
    const uData = mealRows?.filter((row) => row.id !== id);
    await mutate([uData], false);
  }
  };
