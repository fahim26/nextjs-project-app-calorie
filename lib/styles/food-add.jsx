
import { Formik, Form, Field } from "formik";
import styled from "@emotion/styled";

export const StyledForm = styled(Form)(() => ({
  width: "600px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
}));

export const StyledContainer = styled.div((props) => ({
  display: "flex",
  width: "70%",
  height: "60px",
  flexDirection: "column",
  alignItems: "center",
}));

export const StyledField = styled(Field)(() => ({
  width: "100%",
  height: "45px",
  border: "1px solid #ccc",
  borderRadius: "5px",
}));



