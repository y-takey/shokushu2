// @flow
import * as React from "react";
import { Row, Col } from "antd";
import throttle from "lodash/throttle";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { getFiles } from "~/datastore/storage";
import { formatToday } from "~/utils/date";
import useCurrentPosition from "~/components/viewer/hooks/useCurrentPosition";

import ActionBar from "./ComicActionBar";

type Props = {
  handleFullscreen: Function
};

const keyMap = {
  SHOW_NEXT_BOOKMARK: "down",
  SHOW_PREV_BOOKMARK: "up",
  ADD_BOOKMARK: "b",
  TOGGLE_FULL_SCREEN: "f",
};

const HalfPanel = ({
  align,
  filePath,
}: {
  align: "left" | "right",
  filePath: string
}) => (
  <Col
    span={12}
    style={{
      height: "100%",
      textAlign: align,
      backgroundColor: "black",
    }}
  >
    <img alt="" height="100%" src={filePath} />
  </Col>
);

const useFadeOut = initialValue => {
  const [value, set] = React.useState(initialValue);
  const timerId = React.useRef(null);

  const handler = throttle(() => {
    set(true);

    if (timerId.current) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      set(false);
    }, 2000);
  }, 1000);

  return [value, { onMouseMove: handler }];
};

const ComicViewer = ({ handleFullscreen }: Props) => {
  const { changeHotKeys } = React.useContext(AppContext);
  const {
    currentMedia: {
      path: dirPath,
      bookmarks: persistedBookmarks,
      viewedCount,
    },
    update,
  } = React.useContext(MediaContext);
  const [pages, setPages] = React.useState([]);
  const [bookmarks, setBookmarks] = React.useState(persistedBookmarks);
  const [changedAttr, setChangedAttr] = React.useState({});
  const timerId = React.useRef(null);
  const [isFadeOut, fadeOutHandler] = useFadeOut(true);
  const [position, positionKeyMap, positionHandlers] = useCurrentPosition("comic", 1, pages.length)

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
      autoSave({ currentPosition: position });
    },
    [position]
  );

  const autoSave = attrs => {
    setChangedAttr({ ...changedAttr, ...attrs });
  };

  const handleNextBookmark = () => {
    const bookmark = bookmarks.find(bm => bm > position);

    if (bookmark) positionHandlers.MOVE_POSITION(bookmark);
  };

  const handlePrevBookmark = () => {
    const bookmark = [...bookmarks].reverse().find(bm => bm < position);

    if (bookmark) positionHandlers.MOVE_POSITION(bookmark);
  };

  const handleAddBookmark = () => {
    const newBookmarks = bookmarks.includes(position)
      ? bookmarks.filter(bm => bm !== position)
      : [...bookmarks, position].sort((a, b) => a - b);

    setBookmarks(newBookmarks);
    autoSave({ bookmarks: newBookmarks });
  };

  const handlers = {
    ...positionHandlers,
    SHOW_NEXT_BOOKMARK: handleNextBookmark,
    SHOW_PREV_BOOKMARK: handlePrevBookmark,
    ADD_BOOKMARK: handleAddBookmark,
    TOGGLE_FULL_SCREEN: handleFullscreen,
  };

  React.useEffect(
    () => {
      changeHotKeys({ keyMap: { ...keyMap, ...positionKeyMap }, handlers });
    },
    [pages, position]
  );

  return (
    <>
      <Row style={{ height: "100%", maxHeight: "100%" }} {...fadeOutHandler}>
        <HalfPanel align="right" filePath={pages[position]} />
        <HalfPanel align="left" filePath={pages[position - 1]} />
      </Row>
      {
        <ActionBar
          maxPage={pages.length}
          currentPage={position}
          handlers={handlers}
          bookmarks={bookmarks}
          isFadeOut={isFadeOut}
        />
      }
    </>
  );
};

export default ComicViewer;
