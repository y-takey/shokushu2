// @flow
import * as React from "react";

import { SettingProvider } from "~/contexts/SettingContext";
import { MediaProvider } from "~/contexts/MediaContext";

type Props = {
  children: any
};

const AppContext: any = React.createContext({});

const AppProvider = ({ children }: Props) => {
  const [mode, changeMode] = React.useState("");
  const [viewId, changeViewId] = React.useState(null);
  const value = { mode, changeMode, viewId, changeViewId };

  return (
    <AppContext.Provider value={value}>
      <SettingProvider>
        <MediaProvider>{children}</MediaProvider>
      </SettingProvider>
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
