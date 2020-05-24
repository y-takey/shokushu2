import * as React from "react";

import { findOne as loadSetting, update as updateSetting } from "~/datastore/settingStore";
import { Pager, Sorter, Condition, Setting } from "~/types";

interface Props {
  children: React.ReactNode;
}

type ContextType = Setting & {
  initialized: boolean;
  update: (attributes: any) => Promise<void>;
};

const initialCondition: Condition = {
  mediaType: ["comic", "video"],
  title: "",
  fav: null,
  authors: [],
  tags: [],
  isStarred: false,
  isTodo: false,
};

const initialSorter: Sorter = {
  key: "registeredAt",
  value: "desc",
};

const initialPager: Pager = {
  current: 1,
  size: 10,
};

const initialSetting: Setting = {
  mode: "list",
  selectedId: null,
  videoDir: null,
  comicDir: null,
  condition: initialCondition,
  sorter: initialSorter,
  pager: initialPager,
  autoFullscreen: true,
  movingStep: {
    video: 10,
    comic: 2,
  },
};

const noop = async () => {
  // do noting
};

const AppContext = React.createContext<ContextType>({
  ...initialSetting,
  initialized: false,
  update: noop,
});

const AppProvider = ({ children }: Props) => {
  const [initialized, changeInitialized] = React.useState(false);
  const [setting, changeSetting] = React.useState(initialSetting);

  const initializeSetting = async () => {
    const persistedSetting = await loadSetting();
    changeSetting({
      ...setting,
      ...persistedSetting,
    });
    changeInitialized(true);
  };

  React.useEffect(() => {
    initializeSetting();
  }, []);

  const update = async (attributes) => {
    changeSetting({
      ...setting,
      ...attributes,
    });
    await updateSetting(attributes);
  };

  const value = {
    ...setting,
    initialized,
    update,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider, initialCondition, initialSorter, initialPager };

export default AppContext;
