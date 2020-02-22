import * as React from "react";

import AppContext from "~/contexts/AppContext";
import SearchDrawer from "~/components/drawer/SearchDrawer";
import VideoDrawer from "~/components/drawer/VideoDrawer";
import ComicDrawer from "~/components/drawer/ComicDrawer";
import SettingDrawer from "~/components/drawer/SettingDrawer";

const DrawerManager = () => {
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
