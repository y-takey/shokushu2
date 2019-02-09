// @flow
import * as React from "react";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { formatToday } from "~/utils/date";

import ActionBar from "./VideoActionBar";

type Props = {
  handleFullscreen: Function
};

const moveSec = 10;

const VideoContainer = styled("div")`
  height: 100%;
  max-height: 100%;
  position: relative;
  background: black;
`;

const videoStyle = { position: "absolute", top: 0, bottom: 0, margin: "auto" };

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

const VideoViewer = ({ handleFullscreen }: Props) => {
  const { changeHotKeys } = React.useContext(AppContext);
  const {
    currentMedia: {
      path,
      currentPosition,
      bookmarks: persistedBookmarks,
      viewedCount,
    },
    update,
  } = React.useContext(MediaContext);
  const [currentSec, setCurrentSec] = React.useState(currentPosition || 0);
  const [bookmarks, setBookmarks] = React.useState(persistedBookmarks);
  const [changedAttr, setChangedAttr] = React.useState({});
  const timerId = React.useRef(null);
  const [isFadeOut, fadeOutHandler] = useFadeOut(true);
  const [isPlaying, setPlaying] = React.useState(false);
  const [videoLength, setVideoLength] = React.useState(0);
  const videoRef = React.useRef();

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;

    setVideoLength(Math.ceil(videoRef.current.duration));
  };

  const handleChangeSec = throttle(() => {
    if (videoRef.current)
      setCurrentSec(Math.ceil(videoRef.current.currentTime));
  }, 1000);

  React.useEffect(() => {
    handleTogglePlay();
  }, []);

  React.useEffect(
    () => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = currentSec;
    },
    [path]
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
            size: videoLength,
          });
        }
      };
    },
    [changedAttr]
  );

  const autoSave = attrs => {
    setChangedAttr({ ...changedAttr, ...attrs });
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleShowSec = nextSec => {
    if (!videoRef.current) return;
    let actualSec = nextSec;
    if (videoLength < actualSec) actualSec = videoLength;
    if (actualSec < 0) actualSec = 0;

    videoRef.current.currentTime = actualSec;
    setCurrentSec(actualSec);
    autoSave({ currentPosition: actualSec });
  };

  const handleNextSec = () => {
    handleShowSec(currentSec + moveSec);
  };

  const handlePrevSec = () => {
    handleShowSec(currentSec - moveSec);
  };

  const handleNextBookmark = () => {
    const bookmark = bookmarks.find(bm => bm > currentSec);

    if (bookmark) handleShowSec(bookmark);
  };

  const handlePrevBookmark = () => {
    const bookmark = [...bookmarks].reverse().find(bm => bm < currentSec);

    if (bookmark) handleShowSec(bookmark);
  };

  const handleAddBookmark = () => {
    const newBookmarks = bookmarks.includes(currentSec)
      ? bookmarks.filter(bm => bm !== currentSec)
      : [...bookmarks, currentSec].sort((a, b) => a - b);

    setBookmarks(newBookmarks);
    autoSave({ bookmarks: newBookmarks });
  };

  const keyMap = {
    TOGGLE_PLAY: "enter",
    SHOW_NEXT_PAGE: "right",
    SHOW_PREV_PAGE: "left",
    SHOW_NEXT_BOOKMARK: "down",
    SHOW_PREV_BOOKMARK: "up",
    SHOW_PAGE: "none",
    ADD_BOOKMARK: "b",
    TOGGLE_FULL_SCREEN: "f",
  };

  const handlers = {
    TOGGLE_PLAY: handleTogglePlay,
    SHOW_NEXT_PAGE: handleNextSec,
    SHOW_PREV_PAGE: handlePrevSec,
    SHOW_NEXT_BOOKMARK: handleNextBookmark,
    SHOW_PREV_BOOKMARK: handlePrevBookmark,
    SHOW_PAGE: handleShowSec,
    ADD_BOOKMARK: handleAddBookmark,
    TOGGLE_FULL_SCREEN: handleFullscreen,
  };

  React.useEffect(
    () => {
      changeHotKeys({ keyMap, handlers });
    },
    [videoLength, currentSec]
  );

  return (
    <>
      <VideoContainer {...fadeOutHandler}>
        <video
          width="100%"
          src={path}
          ref={videoRef}
          style={videoStyle}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleChangeSec}
        />
      </VideoContainer>
      {
        <ActionBar
          maxPage={videoLength}
          currentPage={currentSec}
          handlers={handlers}
          bookmarks={bookmarks}
          isFadeOut={isFadeOut}
          isPlaying={isPlaying}
        />
      }
    </>
  );
};

export default VideoViewer;
