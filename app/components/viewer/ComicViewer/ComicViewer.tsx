import * as React from "react";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { getFiles } from "~/datastore/storage";
import useCurrentPosition from "~/components/viewer/hooks/useCurrentPosition";
import useBookmarks from "~/components/viewer/hooks/useBookmarks";
import useActionBar from "~/components/viewer/hooks/useActionBar";
import useAutoSave from "~/components/viewer/hooks/useAutoSave";

import Panel from "./Panel";

type Props = {
  handleFullscreen: Function;
};

const keyMap = {
  TOGGLE_FULL_SCREEN: "f",
};

const ComicViewer = ({ handleFullscreen }: Props) => {
  const { changeHotKeys } = React.useContext(AppContext);
  const {
    currentMedia: { path: dirPath },
  } = React.useContext(MediaContext);
  const [pages, setPages] = React.useState([]);
  const [position, positionKeyMap, positionHandlers] = useCurrentPosition(
    "comic",
    1,
    pages.length
  );
  const [bookmarks, bookmarksKeyMap, bookmarksHandlers] = useBookmarks(
    position,
    positionHandlers.MOVE_POSITION
  );

  useAutoSave(position, bookmarks, pages.length);

  React.useEffect(() => {
    const fileNames = getFiles(dirPath, "comic");
    setPages(fileNames.map(({ path }) => path));
  }, [dirPath]);

  const handlers = {
    ...positionHandlers,
    ...bookmarksHandlers,
    TOGGLE_FULL_SCREEN: handleFullscreen,
  };

  React.useEffect(() => {
    changeHotKeys({
      keyMap: {
        ...keyMap,
        ...positionKeyMap,
        ...bookmarksKeyMap,
      },
      handlers,
    });
  }, [pages, position, bookmarks]);

  const [actionBar, fadeOutHandler] = useActionBar(
    position,
    {
      min: 1,
      max: pages.length,
    },
    bookmarks,
    handlers
  );

  return (
    <>
      <Panel
        filePaths={{
          left: pages[position],
          right: pages[position - 1],
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...fadeOutHandler}
      />
      {actionBar}
    </>
  );
};

export default ComicViewer;
