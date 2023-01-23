import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  handleCancelClick,
  handleDeleteClick,
  handleEditClick,
  handleSaveClick,
} from "../../helper-functions/datagrid-column-update";

export const updateActionDef = (
  rowModesModel,
  setRowModesModel,
  mutateMeal,
  setAddedRows,
  mealRows,
  addedRows
) => {
  
  const actionColumnDef = {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 150,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    cellClassName: "actions",
    getActions: (params) => {
      const id = params?.id;
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
      if (isInEditMode && parseInt(Object.keys(rowModesModel)[0]) === id) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(id, rowModesModel, setRowModesModel)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(
              id,
              rowModesModel,
              setRowModesModel,
              setAddedRows,
              mealRows,
              mutateMeal
            )}
            color="inherit"
          />,
        ];
      } else if (
        !isNaN(parseInt(Object.keys(rowModesModel)[0])) &&
        parseInt(Object.keys(rowModesModel)[0]) !== id
      ) {
        return [];
      } else {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(
              id,
              rowModesModel,
              setRowModesModel,
              addedRows
            )}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id, mutateMeal, mealRows)}
            color="inherit"
          />,
        ];
      }
    },
  };
  return actionColumnDef;
};
