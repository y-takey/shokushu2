// @flow
import * as React from "react";

import AppContext from "~/contexts/AppContext";
import SearchDrawer from "~/components/drawer/SearchDrawer";
import SettingDrawer from "~/components/drawer/SettingDrawer";
import MediaDrawer from "~/components/drawer/MediaDrawer";
import EditorDrawer from "~/components/drawer/EditorDrawer";

const DrawerManager = () => {
  const { mode, selectedId, update } = React.useContext(AppContext);

  return (
    <>
      <SearchDrawer visible={mode === "search"} />
      <SettingDrawer visible={mode === "setting"} />
      {mode === "view" && selectedId ? <MediaDrawer visible /> : null}
      {mode === "edit" && selectedId ? (
        <EditorDrawer
          visible
          onClose={() => update({ mode: "list", selectedId: null })}
        />
      ) : null}
    </>
  );
};

export default DrawerManager;
