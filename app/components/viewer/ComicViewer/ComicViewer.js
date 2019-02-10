// @flow
import * as React from "react";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { getFiles } from "~/datastore/storage";
import { formatToday } from "~/utils/date";
import useCurrentPosition from "~/components/viewer/hooks/useCurrentPosition";
import useBookmarks from "~/components/viewer/hooks/useBookmarks";
import useActionBar from "~/components/viewer/hooks/useActionBar";

import Panel from "./Panel";

type Props = {
  handleFullscreen: Function
};

const keyMap = {
  TOGGLE_FULL_SCREEN: "f",
};

const ComicViewer = ({ handleFullscreen }: Props) => {
  const { changeHotKeys } = React.useContext(AppContext);
  const {
    currentMedia: {
      path: dirPath,
      viewedCount,
    },
    update,
  } = React.useContext(MediaContext);
  const [pages, setPages] = React.useState([]);
  const [changedAttr, setChangedAttr] = React.useState({});
  const timerId = React.useRef(null);
  const [position, positionKeyMap, positionHandlers] = useCurrentPosition("comic", 1, pages.length)
  const [bookmarks, bookmarksKeyMap, bookmarksHandlers] = useBookmarks(position, positionHandlers.MOVE_POSITION)

  React.useEffect(
    () => {
      const fileNames = getFiles(dirPath, "comic");
      setPages(fileNames.map(({ path }) => path));
    },
    [dirPath]
  );

  React.useEffect(
    () => {
      if (!Object.keys(changedAttr).length) return;

      if (timerId.current) clearTimeout(timerId.current);

      timerId.current = setTimeout(async () => {
        await update(changedAttr);
        setChangedAttr({});
      }, 3000);

      return async () => {
        if (timerId.current) {
          clearTimeout(timerId.current);
          await update({
            ...changedAttr,
            viewedAt: formatToday(),
            viewedCount: viewedCount + 1,
            size: pages.length,
          });
        }
      };
    },
    [changedAttr]
  );

  React.useEffect(
    () => {
      autoSave({ currentPosition: position, bookmarks });
    },
    [position, bookmarks]
  );

  const autoSave = attrs => {
    setChangedAttr({ ...changedAttr, ...attrs });
  };

  const handlers = {
    ...positionHandlers,
    ...bookmarksHandlers,
    TOGGLE_FULL_SCREEN: handleFullscreen,
  };

  React.useEffect(
    () => {
      changeHotKeys({ keyMap: { ...keyMap, ...positionKeyMap, ...bookmarksKeyMap }, handlers });
    },
    [pages, position]
  );

  const [actionBar, fadeOutHandler] = useActionBar(position, { min: 1, max: pages.length }, bookmarks, handlers)

  return (
    <>
      <Panel filePaths={{ left: pages[position], right: pages[position - 1] }} {...fadeOutHandler} />
      {actionBar}
    </>
  );
};

export default ComicViewer;
