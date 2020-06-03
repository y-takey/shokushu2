import * as React from "react";
import { GlobalHotKeys } from "react-hotkeys";

import ListContext from "./ListContext";

type Props = unknown;

const keyMap = {
  MOVE_NEXT_PAGE: "right",
  MOVE_PREV_PAGE: "left",
  MOVE_NEXT_ROW: ["j", "down"],
  MOVE_PREV_ROW: ["k", "up"],
  HOME: "q",
  FIND: "ctrl+f",
  VIDEO: "ctrl+v",
  COMIC: "ctrl+c",
  SETTING: "ctrl+s",
  FILTER_AUTHOR: "ctrl+a",
};

const HotKeys: React.FC<Props> = () => {
  const {
    filterClear,
    nextPage,
    prevPage,
    nextRow,
    prevRow,
    toggleAuthorFilter,
    showSearchForm,
    showVideoForm,
    showComicForm,
    showSettingForm,
  } = React.useContext(ListContext);

  const handlers = {
    MOVE_NEXT_PAGE: nextPage,
    MOVE_PREV_PAGE: prevPage,
    MOVE_NEXT_ROW: nextRow,
    MOVE_PREV_ROW: prevRow,
    HOME: filterClear,
    FIND: showSearchForm,
    VIDEO: showVideoForm,
    COMIC: showComicForm,
    SETTING: showSettingForm,
    FILTER_AUTHOR: toggleAuthorFilter,
  };

  return <GlobalHotKeys keyMap={keyMap} handlers={handlers as any} allowChanges />;
};

export default HotKeys;
