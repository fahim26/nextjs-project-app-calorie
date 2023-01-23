import { mealEntrySchema } from "../../helper-functions/meal-entry-schema";

export const foodNameColumnDef = {
  field: "foodName",
  headerName: "Food Name",
  editable: true,
  headerClassName: "super-app-theme--header",
  headerAlign: "center",
  width: 150,
  preProcessEditCellProps: (params) => {
    const isValidFoodName = mealEntrySchema.foodSchema.test(
      String(params.props.value)
    );
    return { ...params.props, error: !isValidFoodName };
  },
};
