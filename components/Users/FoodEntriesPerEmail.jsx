// reusable component that calls /api/foodEntriesPerEmail api to get food entries per email


import axios from "axios";
import useSWR from "swr";
import { foodFetchingURL } from "../../lib/urls/food";

const fetcherForUserInfo = (url, userEmail) =>
  axios
    .get(url, { params: { userEmail: userEmail } })
    .then((response) => response.data);

export const FoodEntriesPerEmail = ( props ) => {
  
  const {
    data: foodEntriesPerEmail,
    error,
    mutate: mutateFoodPerEmail,
  } = useSWR([foodFetchingURL,props.email], fetcherForUserInfo);
 
  return {
    foodEntriesPerEmail: foodEntriesPerEmail,
    isLoading: !error && !foodEntriesPerEmail,
    mutateFoodPerEmail: mutateFoodPerEmail,

  };
};
