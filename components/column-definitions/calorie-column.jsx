import { mealEntrySchema } from "../../helper-functions/meal-entry-schema";

export const calorieColumnDef = {
    field: "calorieValue",
    type: "number",
    headerName: "Calorie Value",
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    editable: true,
    width: 150,
    preProcessEditCellProps: (params) => {
      const isValidCalorie = mealEntrySchema.calSchema.test(params.props.value);
      return { ...params.props, error: !isValidCalorie };
    },
  }
  