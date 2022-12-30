import { Box, Typography } from '@mui/material';
import React from 'react'

const UserHelperText = (props) => {
    const {title,desc} = props;
  return (
    <Box
          sx={{
            flex: 5,
            margin: "20px",
            padding: "20px",
            alignItems: "center",
          }}
        >
            
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
        </Box>
  )
}

export default UserHelperText
