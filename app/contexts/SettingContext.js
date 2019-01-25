// @flow
import * as React from "react";

import { findOne, update as updateSetting } from "~/datastore/settingStore";

type Props = {
  children: any
};

const SettingContext: any = React.createContext({});

const SettingProvider = ({ children }: Props) => {
  const [videoDir, changeVideoDir] = React.useState("");
  const [comicDir, changeComicDir] = React.useState("");

  const loadSetting = async () => {
    const setting = await findOne();
    changeVideoDir(setting.videoDir);
    changeComicDir(setting.comicDir);
  };

  React.useEffect(() => {
    loadSetting();
  }, []);

  const update = (fieldName, value) => {
    fieldName === "videoDir" ? changeVideoDir(value) : changeComicDir(value);
    updateSetting({ [fieldName]: value });
  };

  const value = { videoDir, comicDir, update };

  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
};

export { SettingProvider };

export default SettingContext;
