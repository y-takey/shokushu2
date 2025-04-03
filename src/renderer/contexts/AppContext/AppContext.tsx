import * as React from "react";

import { findOne as loadSetting, update as updateSetting } from "~/renderer/datastore/settingStore";
import { Setting, MediaType } from "~/types";

import { initialSetting } from "./initialValues";

interface Props {
  children: React.ReactNode;
}

type ContextType = Setting & {
  initialized: boolean;
  update: (attributes: Partial<Setting>) => Promise<void>;
  getHomeDir: (mediaType: MediaType) => string | null;
};

const noop = async () => {
  // do noting
};

const AppContext = React.createContext<ContextType>({
  ...initialSetting,
  initialized: false,
  update: noop,
  getHomeDir: () => null,
});

export const AppProvider = ({ children }: Props) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = React.useCallback(async (attributes: Partial<Setting>) => {
    changeSetting((current) => ({ ...current, ...attributes }));
    await updateSetting(attributes);
  }, []);

  const getHomeDir = React.useCallback(
    (mediaType) => (mediaType === "comic" ? setting.comicDir : setting.videoDir),
    [setting.comicDir, setting.videoDir]
  );

  const value = React.useMemo(
    () => ({
      ...setting,
      initialized,
      update,
      getHomeDir,
    }),
    [setting, initialized, update, getHomeDir]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
