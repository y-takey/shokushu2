import * as React from "react";

import AuthorsContext from "./AuthorsContext";

export const useAuthors = () => {
  const value = React.useContext(AuthorsContext);
  if (!value) throw new Error("AuthorsContext is undefined");

  return value;
};
