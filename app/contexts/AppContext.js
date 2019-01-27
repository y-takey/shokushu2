// @flow
import * as React from "react";

import {
  findOne as loadSetting,
  update as updateSetting,
} from "~/datastore/settingStore";

type Props = {
  children: any
};

const AppContext: any = React.createContext({});

const initialSetting = {
  mode: "",
  viewId: null,
  videoDir: null,
  comicDir: null,
};

const AppProvider = ({ children }: Props) => {
  const [initialized, changeInitialized] = React.useState(false);
  const [setting, changeSetting] = React.useState(initialSetting);

  const initializeSetting = async () => {
    const persistedSetting = await loadSetting();
    changeSetting({ ...setting, ...persistedSetting });
    changeInitialized(true);
  };

  React.useEffect(() => {
    initializeSetting();
  }, []);

  const update = attributes => {
    changeSetting({ ...setting, ...attributes });
    updateSetting(attributes);
  };

  const value = { ...setting, initialized, update };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider };

export default AppContext;
