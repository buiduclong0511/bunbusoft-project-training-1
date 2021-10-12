import { data } from "../data";

export const combination = (elementId1, elementId2) => {
  return data.find(
    (element) =>
      element.recipe.length > 1 &&
      ((element.recipe[0] === elementId1 && element.recipe[1] === elementId2) ||
        (element.recipe[1] === elementId1 && element.recipe[0] === elementId2))
  );
};

export const getBaseElements = () => {
  return data.filter((element) => element.recipe.length === 1);
};

export const getImage = (elementName) => {
  return `images/elements/${elementName}.png`;
};

export * from "./getWindowDimension";
export * from "./triggerMatchElement";
