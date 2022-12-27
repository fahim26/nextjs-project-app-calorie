// reusable component that calls /api/mealEntriesPerEmail api to get  meal entries per email

import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

export const MealEntriesPerEmail =  (props) => {
    const { data:mealEntriesPerEmail, error,mutate } = useSWR( ["/api/mealEntriesPerEmail", props.sessionEmail], fetcherForUserInfo);
    let brkfst;
    let lunch;
    let supper;
  
    if (mealEntriesPerEmail) {
      brkfst = mealEntriesPerEmail.filter(
        (item) =>
          item.Meal === "Breakfast"
      ).length;
  
      lunch = mealEntriesPerEmail.filter(
        (item) =>
          item.Meal === "Lunch" 
      ).length;
  
      supper = mealEntriesPerEmail.filter(
        (item) =>
          item.Meal === "Supper" 
      ).length;
    }
  

    return {
      mealRows: mealEntriesPerEmail,
      isLoadingMeal: !error && !mealEntriesPerEmail ,
      isErrorMeal: error,
      mutateMeal: mutate,
      breakfastCount: brkfst,
      lunchCount: lunch,
      supperCount: supper,
    }
  }

