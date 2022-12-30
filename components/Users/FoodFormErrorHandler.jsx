import { Box, Typography } from '@mui/material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from 'react'

const FoodFormErrorHandler = (props) => {
    const {error,isTouched} = props;
  return (
    <Box>
    {!error && isTouched && (
        <CheckCircleIcon style={{ color: "#46eb67" }} />
      )}

      {error && isTouched && (
        <Typography variant="caption" display="block" gutterBottom  color="#fa8484">
          {error}
        </Typography>
      ) }
      </Box>
  )
}

export default FoodFormErrorHandler
