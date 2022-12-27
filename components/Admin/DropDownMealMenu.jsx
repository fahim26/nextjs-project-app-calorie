import React from "react";
import {useGridApiContext} from "@mui/x-data-grid";
import PropTypes from "prop-types";

import {
  Box,
  Button,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

export function DropDownMealMenu(props) {
  const paramValue = props.params;
  const { id, value, field } = {...paramValue};
  let MealDescription = props.MealDescription ? props.MealDescription : "adminCall"
  let meal = value;
  const apiRef = useGridApiContext();

  const handleChange = (event, meal) => {
    apiRef.current.setEditCellValue({ id, field, value: meal.props.value });
  };

  return (
    <Box
      sx={{
        bgcolor: "#a7c4f2",
      }}
    >
      
      <TextField
        id="country-code-select"
        select
        value={value}
        onChange={handleChange}
        sx={{
          width: "180px",
        }}
        SelectProps={{
          renderValue: (value) => {
            for (let i = 0; i < 3; i++) {
              if (value === "Select Meal") {
                return "Select Meal";
              }
              if (value === MealDescription[i].mealName) {
                if (
                  MealDescription[i].currEntry >= MealDescription[i].maxEntry
                ) {
                  return "Select Meal";
                } else {
                  return value;
                }
              }
            }
          },
        }}
      >
        {MealDescription?.map((item) => {
          let flag = false;
          if (item.currEntry >= item.maxEntry) {
            flag = true;
          } else {
            flag = false;
          }
          return (
            <MenuItem disabled={flag} key={item.mealID} value={item.mealName}>
              {item.mealName}
            </MenuItem>
          );
        })}
      </TextField>

    </Box>
  );
}
DropDownMealMenu.propTypes = {
  field: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.string,
};
