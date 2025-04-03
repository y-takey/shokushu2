import * as React from "react";

import TagCategoriesContext from "./TagCategoriesContext";

export const useTagCategories = () => {
  const value = React.useContext(TagCategoriesContext);
  if (!value) throw new Error("TagCategoriesContext is undefined");

  return value;
};
