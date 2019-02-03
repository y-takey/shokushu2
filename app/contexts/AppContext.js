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

// type Mode = "list" | "search" | "setting" | "view"

const initialiCondition = {
  mediaType: ["comic", "video"],
  title: "",
  fav: null,
  authors: [],
  tags: [],
};

const initialSetting = {
  mode: "list",
  selectedId: null,
  videoDir: null,
  comicDir: null,
  condition: initialiCondition,
  sorter: { key: "registeredAt", value: "desc" },
  pager: { current: 1, size: 10 },
};

const AppProvider = ({ children }: Props) => {
  const [initialized, changeInitialized] = React.useState(false);
  const [setting, changeSetting] = React.useState(initialSetting);
  const [hotKeys, changeHotKeys] = React.useState({ keyMap: {}, handlers: {} });

  const initializeSetting = async () => {
    const persistedSetting = await loadSetting();
    changeSetting({ ...setting, ...persistedSetting });
    changeInitialized(true);
  };

  React.useEffect(() => {
    initializeSetting();
  }, []);

  const update = async attributes => {
    changeSetting({ ...setting, ...attributes });
    await updateSetting(attributes);
  };

  const value = { ...setting, initialized, update, hotKeys, changeHotKeys };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider };

export default AppContext;
