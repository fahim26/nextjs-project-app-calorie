// reusable component that calls /api/mealEntriesPerEmail api to get  meal entries per email

import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";
import { mealCount } from "../../helper-functions/meal-count";
import { mealFetchingURL } from "../../lib/urls/meal";

const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

export const MealEntriesPerEmail =  (props) => {
    const { data:mealEntriesPerEmail, error,mutate } = useSWR( [mealFetchingURL, props.sessionEmail], fetcherForUserInfo);
    const [brkfst,lunch,supper] = mealCount(mealEntriesPerEmail);
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

