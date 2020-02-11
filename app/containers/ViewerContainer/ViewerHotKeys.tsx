import * as React from "react";
import { GlobalHotKeys } from "react-hotkeys";

import MediumContext from "~/contexts/MediumContext";

const keyMap = {
  EDIT: "e",
  QUIT: "q",
};

const HotKeys = () => {
  const { edit, quit } = React.useContext(MediumContext);

  const handlers = {
    EDIT: edit,
    QUIT: quit,
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers as any} allowChanges />
  );
};

export default HotKeys;
