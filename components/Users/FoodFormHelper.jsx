import React from "react";
import { StyledContainer, StyledField } from "../../lib/styles/food-add";
import FoodFormErrorHandler from "./FoodFormErrorHandler";

const FoodFormHelper = (props) => {
const {nameField,error,isTouched} = props
    return (
    <StyledContainer err={true}>
      <StyledField name={nameField} />

      <FoodFormErrorHandler
        error={error}
        isTouched={isTouched}
      />
    </StyledContainer>
  );
};

export default FoodFormHelper;
