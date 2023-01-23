// component for displaying food entry form and make a post request to add user inputted data to database

import React, { useState } from "react";
import { Formik} from "formik";
import { Alert, Button, Paper, Snackbar, Typography } from "@mui/material";
import { foodYupSchema } from "../../helper-functions/food-yup-schema";
import { motion } from "framer-motion";
import {
  StyledContainer,
  StyledField,
  StyledForm,
} from "../../lib/styles/food-add";
import { handleFoodAddition } from "../../helper-functions/food-add-helper";
import FoodFormErrorHandler from "./FoodFormErrorHandler";
import FoodFormHelper from "./FoodFormHelper";

const FoodAddForm = (props) => {
  const { sessionUser, mealDescription, mutateFoodPerEmail } = props;
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <Paper
      elevation={10}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        backgroundColor: "#dae6e5",
        height: "350px",
      }}
    >
      <Formik
        initialValues={{
          foodName: "Food Name",
          calorieValue: "Calorie Value",
          takenAt: "",
          Meal: "Select Meal",
        }}
        validationSchema={foodYupSchema}
        onSubmit={(values, { resetForm }) =>
          handleFoodAddition(
            values,
            { resetForm },
            { mutateFoodPerEmail },
            sessionUser,
            { setSnackbar }
          )
        }
      >
        {({
          isSubmitting,
          submitForm,
          isValid,
          dirty,
          errors,
          touched,
          values,
        }) => (
          <StyledForm>
            <FoodFormHelper
              nameField="foodName"
              error={errors.foodName}
              isTouched={touched.foodName}
            />
             <FoodFormHelper
              nameField="calorieValue"
              error={errors.calorieValue}
              isTouched={touched.calorieValue}
            />
            <StyledContainer err={true}>
              <StyledField name="takenAt" type="datetime-local" />

              {!errors.takenAt && touched.takenAt && (
                <CheckCircleIcon style={{ color: "#46eb67" }} />
              )}

              {errors.takenAt && touched.takenAt && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  color="#fa8484"
                >
                  {errors.takenAt}
                </Typography>
              )}
            </StyledContainer>

            <StyledContainer err={true}>
              <StyledField as="select" name="Meal">
                <option value="Select Meal">(Select Meal)</option>
                {mealDescription &&
                  mealDescription.map((item) => (
                    <option value={item.mealName}>{item.mealName}</option>
                  ))}
              </StyledField>
              {!errors.Meal && touched.Meal && (
                <CheckCircleIcon style={{ color: "#46eb67" }} />
              )}

              {errors.Meal && touched.Meal && (
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  color="#fa8484"
                >
                  {errors.Meal}
                </Typography>
              )}
            </StyledContainer>

            <Button
              type="button"
              onClick={submitForm}
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              fluidsize="large"
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variant="contained"
              sx={{
                marginTop: "20px",
                width: "150px",
              }}
            >
              ADD
            </Button>
          </StyledForm>
        )}
      </Formik>
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
    </Paper>
  );
};
export default FoodAddForm;
