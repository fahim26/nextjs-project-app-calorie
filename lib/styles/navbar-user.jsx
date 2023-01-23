import { AppBar, Badge, Box, Toolbar, Typography } from "@mui/material";
import styled from "@emotion/styled";
export const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  width: "40%",
  borderRadius: "10px",
  padding: "0 10px",
}));

export const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
}));

export const MobileBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
}));
