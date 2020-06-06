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
  COMIC: "ctrl+l",
  SETTING: "ctrl+p",
  FILTER_AUTHOR: "ctrl+a",
  ITEM_VIEW: "space",
  ITEM_EDIT: "ctrl+e",
  ITEM_TODO: "ctrl+t",
  ITEM_STAR: "ctrl+s",
  ITEM_CHAPTER: "ctrl+c",
  ITEM_OPEN: "ctrl+o",
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
    setItemEvent,
  } = React.useContext(ListContext);

  const fireItemEvent = (event) => () => setItemEvent(event);

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
    ITEM_VIEW: fireItemEvent("view"),
    ITEM_EDIT: fireItemEvent("edit"),
    ITEM_TODO: fireItemEvent("todo"),
    ITEM_STAR: fireItemEvent("star"),
    ITEM_CHAPTER: fireItemEvent("chapter"),
    ITEM_OPEN: fireItemEvent("open"),
  };

  return <GlobalHotKeys keyMap={keyMap} handlers={handlers as any} allowChanges />;
};

export default HotKeys;
