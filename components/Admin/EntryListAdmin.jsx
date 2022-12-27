import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import EditToolbar from "./EditToolbar";

import { GridRowModes, DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { Divider, LinearProgress, Paper } from "@mui/material";
import ColumnMeal from "../Users/ColumnMeal"

const fetcher = (url) => axios.get(url).then((response) => response.data);

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setAddedRows: PropTypes.func.isRequired,
  addedRows: PropTypes.object,
  rowModesModel: PropTypes.object,
  foodRows: PropTypes.array,
  apiType: PropTypes.string,
  mutateEntry: PropTypes.func.isRequired,
  mutateAvg: PropTypes.func.isRequired,
  sessionEmail: PropTypes.string,
  MealDescription: PropTypes.array,
};

const EntryListAdmin = (props) => {


  const foodRows = props.foodRows;

  const mutateEntry = props.mutateEntry;
  const mutateAvg = props.mutateAvg;
  const apiType = props.apiType;
  let MealDescription = props.MealDescription;
  const sessionEmail = String(props.sessionUser?.email);
  const [addedRows, setAddedRows] = useState();
  const [rowModesModel, setRowModesModel] = useState({});
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  function convertDate(food) {
    let { takenAt, ...temp } = food;
    let newTime = new Date(takenAt * 1000);

    let newRowObject = {
      ...temp,
      takenAt: newTime.toLocaleString(),
    };

    return newRowObject;
  }

  const newFoods = foodRows?.map((f) => convertDate(f));

  let rowsWithAddedDemo;
  if (typeof addedRows === "undefined") {
    rowsWithAddedDemo = newFoods;
  } else {

    if (props.foodRows?.slice(-1).id !== addedRows.id)
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

  const processRowUpdate = React.useCallback(async (newRow) => {

    const timeUnix = new Date(String(newRow.takenAt));
    const UpdatedTime = timeUnix.getTime() / 1000;
    const updatedRow = {
      ...newRow,
      takenAt: UpdatedTime,
      isNew: false,
    };
    const { isNew, ...resp } = updatedRow;
    const { id, ...rowDB } = resp;
    

    if(newRow.Meal === "Select Meal"){
      setSnackbar({ children: "Meal Field cannot be empty", severity:"warning" });
    }else{
    if (newRow.isNew ) {

      await mutateEntry(
        async (foodRows) => {
          const updatedTodo = await fetch("/api/mealEntryAdd", {
            method: "POST",
            body: JSON.stringify(rowDB),
          });
          const addedRow = await updatedTodo.json();
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
     
      
      const dataWithAPItype = { ...resp, apiType: props.apiType };
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
        {revalidate:false}
      );


      return resp;
    }
  }
  });

  let columns = [];
 
    columns = ColumnMeal(
      rowModesModel,
      setRowModesModel,
      mutateEntry,
      mutateAvg,
      setAddedRows,
      foodRows,
      addedRows,
      MealDescription,
    );


  const width = props.apiType === "admin" ? 1300 : 700;
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
          rows={foodRows ? rowsWithAddedDemo : []}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          sx={{
            "& .super-app-theme--header": {
              backgroundColor: "#5dd465",
            },
            "& .MuiDataGrid-cell--editing": {
              bgcolor: "rgb(255,215,115, 0.19)",
              color: "#1a3e72",
              "& .MuiInputBase-root": {
                height: "100%",
              },
            },
          }}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: {
              setAddedRows,
              setRowModesModel,
              addedRows,
              rowModesModel,
              foodRows,
              apiType,
              mutateEntry,
              mutateAvg,
              sessionEmail,
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
