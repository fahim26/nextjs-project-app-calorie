// component for displaying food entry form and make a post request to add user inputted data to database

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Alert, Button, Paper, Snackbar, Typography } from "@mui/material";
import styled from "@emotion/styled";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { foodYupSchema } from "../../Func_Definitions/foodYupSchema";
import { motion } from "framer-motion";

const StyledForm = styled(Form)(() => ({
  width: "600px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
}));

const StyledContainer = styled.div((props) => ({
  display: "flex",
  width: "70%",
  height: "60px",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledField = styled(Field)(() => ({
  width: "100%",
  height: "45px",
  border: "1px solid #ccc",
  borderRadius: "5px",
}));

const StyledSelectField = styled(Field)(() => ({
  width: "100%",
  height: "45px",
  border: "1px solid #ccc",
  borderRadius: "5px",
}));

const FoodAddForm = (props) => {
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  let MealDescription = props.MealDescription;

  const saveFoodEntry = async (dataWithUpdatedTime) => {
    let sessionUser = props.sessionUser;
    let new_data = {
      id: "",
      userEmail: sessionUser.email,
      ...dataWithUpdatedTime,
    };

    // api call for adding new food entry with optimistic update

    await props.mutateFoodPerEmail(
      async (foodEntries) => {
        let { id, ...dataWithoutId } = new_data;
        const updatedTodo = await fetch("/api/userFoodEntry", {
          method: "POST",
          body: JSON.stringify(dataWithoutId),
        });

        const addedRow = await updatedTodo.json();

        return [...foodEntries, addedRow];
      },

      { revalidate: true }
    );

    setSnackbar({
      children: "Entry successfully saved",
      severity: "success",
    });
  };

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
        onSubmit={(values, { resetForm }) => {
          const { takenAt, calorieValue, ...restData } = values;
          let calValueInt = parseInt(calorieValue);
          const { mealName, ...exceptMeal } = restData;

          const timeUnix = new Date(String(takenAt));
          const UpdatedTime = timeUnix.getTime() / 1000;
          const dataWithUpdatedTime = {
            ...restData,
            calorieValue: calValueInt,
            takenAt: UpdatedTime,
          };

          saveFoodEntry(dataWithUpdatedTime);
          resetForm();
        }}
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
            <StyledContainer err={true}>
              <StyledField name="foodName" />

              {!errors.foodName && touched.foodName ? (
                <CheckCircleIcon style={{ color: "#46eb67" }} />
              ) : null}

              {errors.foodName && touched.foodName ? (
                <Typography variant="caption" display="block" gutterBottom  color="#fa8484">
                  {errors.foodName}
                </Typography>
              ) : null}
            </StyledContainer>

            <StyledContainer err={true}>
              <StyledField name="calorieValue" />
              {!errors.calorieValue && touched.calorieValue ? (
                <CheckCircleIcon style={{ color: "#46eb67" }} />
              ) : null}

              {errors.calorieValue && touched.calorieValue ? (
                <Typography variant="caption" display="block" gutterBottom color="#fa8484">
                  {errors.calorieValue}
                </Typography>
              ) : null}
            </StyledContainer>

            <StyledContainer err={true}>
              <StyledField
                name="takenAt"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {!errors.takenAt && touched.takenAt ? (
                <CheckCircleIcon style={{ color: "#46eb67" }} />
              ) : null}

              {errors.takenAt && touched.takenAt ? (
                <Typography variant="caption" display="block" gutterBottom color="#fa8484">
                  {errors.takenAt}
                </Typography>
              ) : null}
            </StyledContainer>

            <StyledContainer err={true}>
              <StyledSelectField as="select" name="Meal">
                <option value="Select Meal">(Select Meal)</option>
                {MealDescription &&
                  MealDescription.map((item) => (
                    <option value={item.mealName}>{item.mealName}</option>
                  ))}
              </StyledSelectField>
              {!errors.Meal && touched.Meal ? (
                <CheckCircleIcon style={{ color: "#46eb67" }} />
              ) : null}

              {errors.Meal && touched.Meal ? (
                <Typography variant="caption" display="block" gutterBottom color="#fa8484">
                  {errors.Meal}
                </Typography>
              ) : null}
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
