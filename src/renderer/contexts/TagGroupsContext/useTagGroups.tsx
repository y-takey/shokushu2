import * as React from "react";

import TagGroupsContext from "./TagGroupsContext";

export const useTagGroups = () => {
  const value = React.useContext(TagGroupsContext);
  if (!value) throw new Error("TagGroupsContext is undefined");

  return value;
};
