import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import EditToolbar from "./EditToolbar";

import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { Divider, LinearProgress, Paper } from "@mui/material";
import ColumnMeal from "../Users/ColumnMeal";
import { preprocessFoods } from "../../lib/utils";
import { processRowUpdate } from "../../helper-functions/meal-datagrid-update";


EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setAddedRows: PropTypes.func.isRequired,
  addedRows: PropTypes.object,
  rowModesModel: PropTypes.object,
  mealRows: PropTypes.array,
  apiType: PropTypes.string,
  mutateMeal: PropTypes.func.isRequired,
  sessionEmail: PropTypes.string,
  mealDescription: PropTypes.array,
};

const EntryListAdmin = (props) => {
  const {mealRows,mutateMeal,apiType,email,mealDescription} = props;
  const [addedRows, setAddedRows] = useState();
  const [rowModesModel, setRowModesModel] = useState({});
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const newFoods = preprocessFoods(mealRows);
  const rowsWithAddedDemo=[];
  if (typeof addedRows === "undefined") {
    rowsWithAddedDemo = newFoods;
  } else {
    if (props.mealRows?.slice(-1).id !== addedRows.id)
      rowsWithAddedDemo = [...newFoods, addedRows];
  }



  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };
  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.error(error);
    setSnackbar({ children: "Field cannot be empty", severity: "error" });
  }, []);

  const columns = ColumnMeal(
    rowModesModel,
    setRowModesModel,
    mutateMeal,
    setAddedRows,
    mealRows,
    addedRows,
    mealDescription
  );
  console.log("==================== END EEntry List Admin ", columns);
  const width = props.apiType === "admin" ? 1300 : 900;
  const height = props.apiType === "admin" ? 600 : 400;

  return (
    <Box
      sx={{
        marginBottom: "10px",
        backgroundColor: "#ccfff9",
        "& .Mui-error": {
          bgcolor: "#f5b5bc",
          color: "#ff4343",
        },
      }}
    >
      <Divider>ALL USER INFO</Divider>
      <Paper
        elevation={10}
        sx={{
          width: { width },
          height: { height },
          marginBottom: "10px",
          padding: "20px",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <DataGrid
          rows={mealRows ? rowsWithAddedDemo : []}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={async (newRow) => {
            const emailUser = props.email;
            console.log("Process Row Update :", emailUser);
            const updatedFood = await processRowUpdate(
              newRow,
              setAddedRows,
              emailUser,
              mutateMeal,setSnackbar
            );
            return updatedFood;
          }}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: {
              setAddedRows,
              setRowModesModel,
              addedRows,
              rowModesModel,
              mealRows,
              apiType,
              mutateMeal,
              email,
            },
          }}
          experimentalFeatures={{
            newEditingApi: true,
            preventCommitWhileValidating: true,
          }}
        />
      </Paper>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={400}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};
export default EntryListAdmin;
