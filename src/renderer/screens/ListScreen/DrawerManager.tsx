import * as React from "react";

import AppContext from "~/renderer/contexts/AppContext";

import SearchDrawer from "./SearchDrawer";
import SettingDrawer from "./SettingDrawer";

const DrawerManager: React.FC = () => {
  const { mode } = React.useContext(AppContext);

  return (
    <>
      <SearchDrawer visible={mode === "search"} />
      <SettingDrawer visible={mode === "setting"} />
    </>
  );
};

export default DrawerManager;
