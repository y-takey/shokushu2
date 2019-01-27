// @flow
import * as React from "react";
import { GlobalHotKeys } from "react-hotkeys";

import AppContext from "~/contexts/AppContext";

const HotKeys = () => {
  const {
    hotKeys: { keyMap, handlers },
  } = React.useContext(AppContext);

  return <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges />;
};

export default HotKeys;
