import { calorieColumnDef } from "../column-definitions/calorie-column";
import { updateActionDef } from "../column-definitions/action-column";
import { foodNameColumnDef } from "../column-definitions/food-name-column";
import { idColumnDef } from "../column-definitions/id-column-def";
import { updateMealDef } from "../column-definitions/meal-column-def";

const ColumnMeal = (
  rowModesModel,
  setRowModesModel,
  mutateMeal,
  setAddedRows,
  mealRows,
  addedRows,
  mealDescription
) => {

  const actionColumnDef = updateActionDef(
    rowModesModel,
    setRowModesModel,
    mutateMeal,
    setAddedRows,
    mealRows,
    addedRows
  );
  const mealColumnDef = updateMealDef(mealDescription);
  const columns = [
    idColumnDef,
    foodNameColumnDef,
    calorieColumnDef,
    mealColumnDef,
    actionColumnDef,
  ];
  return columns;
};

export default ColumnMeal;
