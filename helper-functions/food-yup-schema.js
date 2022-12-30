import * as Yup from "yup";

export const foodYupSchema = Yup.object().shape({
    foodName: Yup.string()
      .typeError(
        "Food Name must contain only letters. No number or Special Character"
      )
      .required("Food Name must be a string")
      .matches(/^[a-zA-Z\s]*$/, "Don't look like a valid food name !!"),
    calorieValue: Yup.number()
      .typeError("Calorie Value must be a number")
      .test(
        "Is positive?",
        "ERROR: The number must be greater than 0!",
        (value) => value > 0
      ),
    takenAt: Yup.string().required("Correctly choose a date and time"),
    Meal: Yup.string()
      .required("Enter Meal")
      .matches(
        /^((Select Meal(?!$)).+|(?!Select Meal).+)$/,
        "Select From Menu According to Max Number"
      ),
  });

  