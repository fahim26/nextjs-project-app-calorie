import axios from "axios";
// import React from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { columnsUserFoods, preprocessFoods } from "../../lib/utils";

const FoodEntryList = (props) => {
  const foods = preprocessFoods(props?.foodEntries);


  return (
    <Box sx={{ height: 600 }}>
      <DataGrid
        rows={foods ? foods : []}
        columns={columnsUserFoods}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default FoodEntryList;
