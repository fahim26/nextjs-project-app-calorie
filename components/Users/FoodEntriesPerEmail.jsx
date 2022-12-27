// reusable component that calls /api/foodEntriesPerEmail api to get food entries per email


import axios from "axios";
import useSWR, { mutate, useSWRConfig } from "swr";

const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

export const FoodEntriesPerEmail = ( props ) => {
  
  const {
    data: foodEntriesPerEmail,
    error,
    isLoading,
    mutate: mutateFoodPerEmail,
  } = useSWR(["/api/foodEntriesPerEmail",props.sessionEmail], fetcherForUserInfo);
 
  return {
    foodEntriesPerEmail: foodEntriesPerEmail,
    isLoading: !error && !foodEntriesPerEmail,
    mutateFoodPerEmail: mutateFoodPerEmail,

  };
};
