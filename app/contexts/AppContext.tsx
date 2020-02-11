import * as React from "react";

import {
  findOne as loadSetting,
  update as updateSetting,
} from "~/datastore/settingStore";
import { MediaType, Pager, Sorter } from "~/types";

interface Props {
  children: React.ReactNode;
}

type Mode = "list" | "search" | "setting" | "view" | "edit" | "video" | "comic";

type Condition = {
  mediaType: MediaType[];
  title: string;
  fav: number | null;
  authors: string[];
  tags: string[];
};

export type Setting = {
  mode: Mode;
  selectedId: string | null;
  videoDir: null;
  comicDir: null;
  condition: Condition;
  sorter: Sorter;
  pager: Pager;
  autoFullscreen: boolean;
  movingStep: { [key in MediaType]: number };
};

type HotKeys = {
  keyMap: { [key: string]: string };
  handlers: { [key: string]: (keyEvent?: React.KeyboardEvent) => void };
};

type ContextType = Setting & {
  initialized: boolean;
  update: (attributes: any) => Promise<void>;
  hotKeys: HotKeys;
  changeHotKeys: Function;
};

const initialCondition: Condition = {
  mediaType: ["comic", "video"],
  title: "",
  fav: null,
  authors: [],
  tags: [],
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

const initialHotKeys = {
  keyMap: {},
  handlers: {},
};

const AppContext = React.createContext<ContextType>({
  ...initialSetting,
  initialized: false,
  update: noop,
  hotKeys: initialHotKeys,
  changeHotKeys: () => {},
});

const AppProvider = ({ children }: Props) => {
  const [initialized, changeInitialized] = React.useState(false);
  const [setting, changeSetting] = React.useState(initialSetting);
  const [hotKeys, changeHotKeys] = React.useState(initialHotKeys);

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

  const update = async attributes => {
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
    hotKeys,
    changeHotKeys,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider, initialSorter, initialPager };

export default AppContext;
