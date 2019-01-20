// @flow
import * as React from "react";
import { Drawer } from "antd";

import AppContext from "~/contexts/AppContext";

const DrawerManager = () => {
  const { mode, changeMode } = React.useContext(AppContext);
  const handleClose = () => {
    changeMode("");
  };

  return (
    <Drawer
      title="Search"
      placement="left"
      closable
      onClose={handleClose}
      visible={mode === "search"}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default DrawerManager;
