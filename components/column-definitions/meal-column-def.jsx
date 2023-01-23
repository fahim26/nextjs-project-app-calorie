import { mealEntrySchema } from "../../helper-functions/meal-entry-schema";
import { DropDownMealMenu } from "../admins/DropDownMealMenu";
import PropTypes from "prop-types";

function renderEditedMealMenu(params) {
  return <div>{params.value}</div>;
}

renderEditedMealMenu.propTypes = {
  value: PropTypes.string.isRequired,
};

export const updateMealDef = (mealDescription) => {
  const mealColumnDef = {
    field: "Meal",
    headerName: "Meal",
    width: 200,
    editable: true,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    preProcessEditCellProps: (params) => {
      const isValidMeal = mealEntrySchema.mealSchema.test(params.props.value);
      return { ...params.props, error: !isValidMeal };
    },
    renderCell: renderEditedMealMenu,
    renderEditCell: (params) => {
      return (
        <DropDownMealMenu params={params} mealDescription={mealDescription} />
      );
    },
  };
  return mealColumnDef;
};
