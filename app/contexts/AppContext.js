// @flow
import * as React from "react";

type Props = {
  children: any
};

const AppContext: any = React.createContext({});

const AppProvider = ({ children }: Props) => {
  const [mode, changeMode] = React.useState("");
  const [viewId, changeViewId] = React.useState(null);
  const value = { mode, changeMode, viewId, changeViewId };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider };

export default AppContext;
