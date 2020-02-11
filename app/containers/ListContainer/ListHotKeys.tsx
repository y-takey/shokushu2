import * as React from "react";
import { GlobalHotKeys } from "react-hotkeys";

import ListContext from "~/contexts/ListContext";

const keyMap = {
  MOVE_NEXT_PAGE: "right",
  MOVE_PREV_PAGE: "left",
  FIND: "f",
  VIDEO: "v",
  COMIC: "c",
  SETTING: "s",
};

const HotKeys = () => {
  const {
    nextPage,
    prevPage,
    showSearchForm,
    showVideoForm,
    showComicForm,
    showSettingForm,
  } = React.useContext(ListContext);

  const handlers = {
    MOVE_NEXT_PAGE: nextPage,
    MOVE_PREV_PAGE: prevPage,
    FIND: showSearchForm,
    VIDEO: showVideoForm,
    COMIC: showComicForm,
    SETTING: showSettingForm,
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers as any} allowChanges />
  );
};

export default HotKeys;
