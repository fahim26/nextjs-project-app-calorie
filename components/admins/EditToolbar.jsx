import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import {
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";


export default function EditToolbar(props) {
  const {
    setAddedRows,
    setRowModesModel,
    addedRows,
    rowModesModel,
    mealRows,
    apiType,
    mutateMeal,
    sessionEmail,
  } = props;
  const { mutate } = useSWRConfig();


  const [mealCode, setMealCode] = React.useState("");

  const handleChange = (event) => {
    setMealCode(event.target.value);
  };
  
  const handleClick = (mealRows) => async () => {
    const new_id = mealRows?.length !== 0 ? Math.max(...mealRows?.map((o) => o.id)) + 1 : 1;

    const new_row = {
      id: new_id,
      userEmail: sessionEmail,
      foodName: "Food",
      calorieValue: 10,
      takenAt: new Date(),
      Meal: "Select Meal",
      isNew: true,
    };

    if (Object.keys(rowModesModel).length === 0) {
      setAddedRows(new_row);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [new_id]: { mode: GridRowModes.Edit, fieldToFocus: "foodName" },
      }));
    }
  };

  return (
    <GridToolbarContainer>
      <Button
        disabled={addedRows || Object.keys(rowModesModel).length > 0}
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick(mealRows)}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
