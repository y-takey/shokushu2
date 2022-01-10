import * as React from "react";

import { Action } from "./interface";

export type BookmarkContextType = {
  addBookmark: () => void;
  prevBookmark: () => void;
  nextBookmark: () => void;
};

const noop = () => {
  // do noting
};

export const initialBookmarkContext: BookmarkContextType = {
  addBookmark: noop,
  prevBookmark: noop,
  nextBookmark: noop,
};

const useBookmark = (dispatch: React.Dispatch<Action>): BookmarkContextType => {
  const addBookmark = () => {
    dispatch({ type: "add_bookmark" });
  };
  const prevBookmark = () => {
    dispatch({ type: "prev_bookmark" });
  };
  const nextBookmark = () => {
    dispatch({ type: "next_bookmark" });
  };

  return {
    addBookmark,
    prevBookmark,
    nextBookmark,
  };
};

export default useBookmark;
