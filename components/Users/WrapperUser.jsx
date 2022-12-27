// this component works as a wrapper around other users components.
// this component gets food entries and meal entries per email and pass these info as props to associated components

import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import FoodAddForm from "./FoodAddForm";
import { FoodEntriesPerEmail } from "./FoodEntriesPerEmail";
import { MealEntriesPerEmail } from "./MealEntriesPerEmail";
import FoodEntryList from "./FoodEntryList";
import { motion } from "framer-motion";

const UserEntry = ({ sessionUser }) => {
  const sessionEmail = sessionUser?.email;
  const { foodEntriesPerEmail, error, isLoading, mutateFoodPerEmail } =
    FoodEntriesPerEmail({ sessionEmail });

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
            <Paper
              elevation={10}
              sx={{
                height: "100px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#bdf2f2",
              }}
              component={motion.div}
              whileHover={{
                scale: 0.9,
                transition: { duration: 0.7 }
              }}
              whileTap={{ scale: 0.85 }}
              onClick={() => setisEClicked(true)}
            >
              <Typography sx={{ color: "#0f0303" }} variant="h5">Get Food Entry Form</Typography>
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

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          bgcolor: "#f5d0f7",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            flex: 7,
            margin: "20px",
            padding: "20px",
          }}
        >
          <FoodEntryList foodEntries={foodEntriesPerEmail} />
        </Paper>
        <Box
          sx={{
            flex: 3,
            margin: "20px",
            padding: "20px",
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            Your Food Entries
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here you can see all of your added food entries.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserEntry;
