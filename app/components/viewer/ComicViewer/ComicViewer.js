// @flow
import * as React from "react";
import { Row, Col } from "antd";
import throttle from "lodash/throttle";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { getFiles } from "~/datastore/storage";
import { formatToday } from "~/utils/date";

import ActionBar from "./ComicActionBar";

type Props = {
  handleFullscreen: Function
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
      currentPosition,
      bookmarks: persistedBookmarks,
      viewedCount,
    },
    update,
  } = React.useContext(MediaContext);
  const [pages, setPages] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(currentPosition || 1);
  const [bookmarks, setBookmarks] = React.useState(persistedBookmarks);
  const [changedAttr, setChangedAttr] = React.useState({});
  const timerId = React.useRef(null);
  const [isFadeOut, fadeOutHandler] = useFadeOut(true);

  React.useEffect(() => {
    handleFullscreen();
  }, []);

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

  const autoSave = attrs => {
    setChangedAttr({ ...changedAttr, ...attrs });
  };

  const handleShowPage = nextPage => {
    setCurrentPage(nextPage);
    autoSave({ currentPosition: nextPage });
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) handleShowPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) handleShowPage(currentPage - 1);
  };

  const handleNextBookmark = () => {
    const bookmark = bookmarks.find(bm => bm > currentPage);

    if (bookmark) handleShowPage(bookmark);
  };

  const handlePrevBookmark = () => {
    const bookmark = [...bookmarks].reverse().find(bm => bm < currentPage);

    if (bookmark) handleShowPage(bookmark);
  };

  const handleAddBookmark = () => {
    const newBookmarks = bookmarks.includes(currentPage)
      ? bookmarks.filter(bm => bm !== currentPage)
      : [...bookmarks, currentPage].sort((a, b) => a - b);

    setBookmarks(newBookmarks);
    autoSave({ bookmarks: newBookmarks });
  };

  const keyMap = {
    SHOW_NEXT_PAGE: "right",
    SHOW_PREV_PAGE: "left",
    SHOW_NEXT_BOOKMARK: "down",
    SHOW_PREV_BOOKMARK: "up",
    SHOW_PAGE: "none",
    ADD_BOOKMARK: "b",
    TOGGLE_FULL_SCREEN: "f",
  };

  const handlers = {
    SHOW_NEXT_PAGE: handleNextPage,
    SHOW_PREV_PAGE: handlePrevPage,
    SHOW_NEXT_BOOKMARK: handleNextBookmark,
    SHOW_PREV_BOOKMARK: handlePrevBookmark,
    SHOW_PAGE: handleShowPage,
    ADD_BOOKMARK: handleAddBookmark,
    TOGGLE_FULL_SCREEN: handleFullscreen,
  };

  React.useEffect(
    () => {
      changeHotKeys({ keyMap, handlers });
    },
    [pages, currentPage]
  );

  return (
    <>
      <Row style={{ height: "100%", maxHeight: "100%" }} {...fadeOutHandler}>
        <HalfPanel align="right" filePath={pages[currentPage]} />
        <HalfPanel align="left" filePath={pages[currentPage - 1]} />
      </Row>
      {
        <ActionBar
          maxPage={pages.length}
          currentPage={currentPage}
          handlers={handlers}
          bookmarks={bookmarks}
          isFadeOut={isFadeOut}
        />
      }
    </>
  );
};

export default ComicViewer;
