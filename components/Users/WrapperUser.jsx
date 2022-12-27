// this component works as a wrapper around other users components.
// this component gets food entries and meal entries per email and pass these info as props to associated components

import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import FoodAddForm from "./FoodAddForm";
import { FoodEntriesPerEmail } from "./FoodEntriesPerEmail";
import { MealEntriesPerEmail } from "./MealEntriesPerEmail";

const UserEntry = ({ sessionUser }) => {
  const sessionEmail = sessionUser?.email;
  const { foodEntriesPerEmail, error, isLoading, mutateFoodPerEmail } = FoodEntriesPerEmail({ sessionEmail });

  const {
    mealRows,
    isLoadingMeal,
    errorMealPerEmail,
    mutateMeal,
    breakfastCount,
    lunchCount,
    supperCount,
  } = MealEntriesPerEmail({ sessionEmail });

  const [isEClicked, setisEClicked] = useState(false);
  const [MealDescription, setMealDescription] = useState([
    { mealID: "1", mealName: "Breakfast", currEntry: 0, maxEntry: 5 },
    { mealID: "2", mealName: "Lunch", currEntry: 0, maxEntry: 3 },
    { mealID: "3", mealName: "Supper", currEntry: 0, maxEntry: 2 },
  ]);

  if (isLoadingMeal || isLoading) {
    return <div>Loading Wrapper</div>;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#a7d6d9",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            flex: 5,
            margin: "20px",
            padding: "20px",
          }}
        >
          {isEClicked === true ? (
            <FoodAddForm
              sessionUser={sessionUser}
              foodEntries={foodEntriesPerEmail}
              mutateFoodPerEmail={mutateFoodPerEmail}
              MealDescription={MealDescription}
            />
          ) : (
            <Paper elevation={10} onClick={() => setisEClicked(true)}>
              ADD Entry
            </Paper>
          )}
        </Paper>
        <Box
          sx={{
            flex: 5,
            margin: "20px",
            padding: "20px",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Food Entry
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here you can add foods with associated calorie value and other
            informations.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserEntry;
