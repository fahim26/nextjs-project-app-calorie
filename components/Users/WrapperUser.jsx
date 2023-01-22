// this component works as a wrapper around other users components.
// this component gets food entries and meal entries per email and pass these info as props to associated components

import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import FoodAddForm from "./FoodAddForm";
import { FoodEntriesPerEmail } from "./FoodEntriesPerEmail";
import { MealEntriesPerEmail } from "./MealEntriesPerEmail";
import { motion } from "framer-motion";
import FoodEntryList from "./FoodEntryList";
import EntryListAdmin from "../admins/EntryListAdmin";
import { updateMealCount } from "../../lib/utils";
import UserHelperText from "./UserHelperText";

const UserEntry = ({ sessionUser }) => {
  const email = sessionUser?.email;
  const { foodEntriesPerEmail, error, isLoading, mutateFoodPerEmail } =
    FoodEntriesPerEmail({ email });

  const {
    mealRows,
    isLoadingMeal,
    errorMealPerEmail,
    mutateMeal,
    breakfastCount,
    lunchCount,
    supperCount,
  } = MealEntriesPerEmail({ email });

  const [isClicked, setisClicked] = useState(false);
  const [mealDescription, setmealDescription] = useState([
    { mealID: "1", mealName: "Breakfast", currEntry: 0, maxEntry: 5 },
    { mealID: "2", mealName: "Lunch", currEntry: 0, maxEntry: 3 },
    { mealID: "3", mealName: "Supper", currEntry: 0, maxEntry: 2 },
  ]);

  const updatedMealCount = updateMealCount(mealDescription,breakfastCount,lunchCount,supperCount);
  const foodFormDescription = "Here you can add foods with associated calorie value and other informations";
  const foodDatagridDescription = " Here you can see all of your added food entries.";
  const mealEntryDescription = "Here you can add,delete or update foods as meal entries. Maximum number of Breakfast is 5, Lunch is 3, Supper is 2";
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
          {isClicked === true ? (
            <FoodAddForm
              sessionUser={sessionUser}
              foodEntries={foodEntriesPerEmail}
              mutateFoodPerEmail={mutateFoodPerEmail}
              mealDescription={mealDescription}
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
                transition: { duration: 0.7 },
              }}
              whileTap={{ scale: 0.85 }}
              onClick={() => setisClicked(true)}
            >
              <Typography sx={{ color: "#0f0303" }} variant="h5">
                Get Food Entry Form
              </Typography>
            </Paper>
          )}
        </Paper>
        <UserHelperText title={"Food Entry"} desc={foodFormDescription} />

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
        <UserHelperText title={"Your Food Entries"} desc={foodDatagridDescription} />
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          bgcolor: "#f5d0f7",
        }}
      >
        <UserHelperText title={"Meal Entry"} desc={mealEntryDescription} />

        <Paper
          elevation={10}
          sx={{
            flex: 5,
            margin: "20px",
            padding: "20px",
          }}
        >
          <EntryListAdmin
            mealRows={mealRows}
            mutateMeal={mutateMeal}
            apiType="user"
            email={email}
            mealDescription={updatedMealCount}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default UserEntry;