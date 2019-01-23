// @flow
import * as React from "react";

import { getSetting, updateSetting } from "~/datastore/db";

type Props = {
  children: any
};

const SettingContext: any = React.createContext({});

const SettingProvider = ({ children }: Props) => {
  const [videoDir, changeVideoDir] = React.useState("");
  const [comicDir, changeComicDir] = React.useState("");

  const loadSetting = async () => {
    const setting = await getSetting();
    changeVideoDir(setting.videoDir);
    changeComicDir(setting.comicDir);
  };

  React.useEffect(() => {
    loadSetting();
  }, []);

  const update = attrs => {
    updateSetting({ videoDir, comicDir, ...attrs });
  };

  const value = { videoDir, comicDir, update };

  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
};

export { SettingProvider };

export default SettingContext;
