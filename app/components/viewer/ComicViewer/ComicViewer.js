// @flow
import * as React from "react";
import { Row, Col } from "antd";
import throttle from "lodash/throttle";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { getFiles } from "~/datastore/storage";
import { formatToday } from "~/utils/date";
import useCurrentPosition from "~/components/viewer/hooks/useCurrentPosition";
import useBookmarks from "~/components/viewer/hooks/useBookmarks";

import ActionBar from "./ComicActionBar";

type Props = {
  handleFullscreen: Function
};

const keyMap = {
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
      viewedCount,
    },
    update,
  } = React.useContext(MediaContext);
  const [pages, setPages] = React.useState([]);
  const [changedAttr, setChangedAttr] = React.useState({});
  const timerId = React.useRef(null);
  const [isFadeOut, fadeOutHandler] = useFadeOut(true);
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
