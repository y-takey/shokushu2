// @flow
import * as React from "react";
import sortBy from "lodash/sortBy";

import MediaContext from "~/contexts/MediaContext";

const keyMap = {
  MOVE_NEXT_BOOKMARK: "down",
  MOVE_PREV_BOOKMARK: "up",
  ADD_BOOKMARK: "b",
};

const useBookmarks = (position: number, onMovePostion: Function) => {
  const {
    currentMedia: { bookmarks: persistedBookmarks },
  } = React.useContext(MediaContext);
  const [bookmarks, setBookmarks] = React.useState(persistedBookmarks);

  const handleNextBookmark = () => {
    const bookmark = bookmarks.find(bm => bm > position);

    if (bookmark) onMovePostion(bookmark);
  };

  const handlePrevBookmark = () => {
    const bookmark = [...bookmarks].reverse().find(bm => bm < position);

    if (bookmark) onMovePostion(bookmark);
  };

  const handleAddBookmark = () => {
    const newBookmarks = bookmarks.includes(position)
      ? bookmarks.filter(bm => bm !== position)
      : sortBy([...bookmarks, position]);

    setBookmarks(newBookmarks);
  };

  const handlers = {
    MOVE_NEXT_BOOKMARK: handleNextBookmark,
    MOVE_PREV_BOOKMARK: handlePrevBookmark,
    ADD_BOOKMARK: handleAddBookmark,
  };

  return [bookmarks, keyMap, handlers];
};

export default useBookmarks;
