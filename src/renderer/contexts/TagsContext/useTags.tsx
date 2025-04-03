import * as React from "react";

import TagsContext from "./TagsContext";

export const useTags = () => {
  const value = React.useContext(TagsContext);
  if (!value) throw new Error("TagsContext is undefined");

  return value;
};
