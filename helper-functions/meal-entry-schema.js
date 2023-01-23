export const mealEntrySchema = {
    emailSchema:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    foodSchema: /(.|\s)*\S(.|\s)*$/,
    calSchema: /^\d*[1-9]+\d*$/,
    mealSchema: /^.*(Breakfast|Supper|Lunch).*$/,
  };
  