import * as React from "react";

import AppContext from "~/renderer/contexts/AppContext";

import SearchDrawer from "./SearchDrawer";
import TagsDrawer from "./TagsDrawer";
import SettingDrawer from "./SettingDrawer";

const DrawerManager: React.FC = () => {
  const { mode } = React.useContext(AppContext);

  return (
    <>
      <SearchDrawer visible={mode === "search"} />
      <TagsDrawer visible={mode === "tags"} />
      <SettingDrawer visible={mode === "setting"} />
    </>
  );
};

export default DrawerManager;
