import * as React from "react";

import AppContext from "~/contexts/AppContext";

import SearchDrawer from "./SearchDrawer";
import VideoDrawer from "./VideoDrawer";
import ComicDrawer from "./ComicDrawer";
import SettingDrawer from "./SettingDrawer";

const DrawerManager: React.FC = () => {
  const { mode } = React.useContext(AppContext);

  return (
    <>
      <SearchDrawer visible={mode === "search"} />
      <SettingDrawer visible={mode === "setting"} />
      <VideoDrawer visible={mode === "video"} />
      <ComicDrawer visible={mode === "comic"} />
    </>
  );
};

export default DrawerManager;
