import * as React from "react";
import { GlobalHotKeys } from "react-hotkeys";

import MediumContext from "~/contexts/MediumContext";

const keyMap = {
  EDIT: "e",
  FULL_SCREEN: ["f", "escape"],
  OPEN: "o",
  QUIT: "q",
  TOGGLE_CHAPTERS: "c",
  TOGGLE_STARRED: "s",
  TOGGLE_TODO: "t",
  TOGGLE_PLAY: "enter",
  NEXT_CHAPTER: "j",
  PREV_CHAPTER: "k",
  NEXT_POSITION: "right",
  NEXT_POSITION_HALF: "shift+right",
  PREV_POSITION: "left",
  PREV_POSITION_HALF: "shift+left",
  NEXT_BOOKMARK: "down",
  PREV_BOOKMARK: "up",
  ADD_BOOKMARK: "b",
};

const HotKeys: React.FC = () => {
  const {
    edit,
    openFolder,
    toggleChapters,
    toggleStarred,
    toggleTodo,
    toggleFullScreen,
    togglePlaying,
    nextPosition,
    nextPositionHalf,
    prevPosition,
    prevPositionHalf,
    nextBookmark,
    prevBookmark,
    addBookmark,
    prevChapter,
    nextChapter,
    quit,
  } = React.useContext(MediumContext);

  const handlers = {
    EDIT: edit,
    FULL_SCREEN: toggleFullScreen,
    OPEN: openFolder,
    QUIT: quit,
    TOGGLE_CHAPTERS: toggleChapters,
    TOGGLE_STARRED: toggleStarred,
    TOGGLE_TODO: toggleTodo,
    TOGGLE_PLAY: togglePlaying,
    NEXT_CHAPTER: nextChapter,
    PREV_CHAPTER: prevChapter,
    NEXT_POSITION: nextPosition,
    NEXT_POSITION_HALF: nextPositionHalf,
    PREV_POSITION: prevPosition,
    PREV_POSITION_HALF: prevPositionHalf,
    NEXT_BOOKMARK: nextBookmark,
    PREV_BOOKMARK: prevBookmark,
    ADD_BOOKMARK: addBookmark,
  };

  return <GlobalHotKeys keyMap={keyMap} handlers={handlers as any} allowChanges />;
};

export default HotKeys;
