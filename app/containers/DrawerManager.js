// @flow
import * as React from "react";

import AppContext from "~/contexts/AppContext";
import SearchDrawer from "~/components/drawer/SearchDrawer";
import SettingDrawer from "~/components/drawer/SettingDrawer";
import MediaDrawer from "~/components/drawer/MediaDrawer";

const DrawerManager = () => {
  const { mode } = React.useContext(AppContext);

  return (
    <>
      <SearchDrawer visible={mode === "search"} />
      <SettingDrawer visible={mode === "setting"} />
      {mode === "view" ? <MediaDrawer visible /> : null}
    </>
  );
};

export default DrawerManager;
