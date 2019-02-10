// @flow
import * as React from "react";
import { Icon } from "antd";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import useCurrentPosition from "~/components/viewer/hooks/useCurrentPosition";
import useBookmarks from "~/components/viewer/hooks/useBookmarks";
import useActionBar from "~/components/viewer/hooks/useActionBar";
import { formatSeconds, formatToday } from "~/utils/date";

type Props = {
  handleFullscreen: Function
};

const keyMap = {
  TOGGLE_PLAY: "enter",
  TOGGLE_FULL_SCREEN: "f",
};

const VideoContainer = styled("div")`
  height: 100%;
  max-height: 100%;
  position: relative;
  background: black;
`;

const videoStyle = { position: "absolute", top: 0, bottom: 0, margin: "auto" };

const VideoViewer = ({ handleFullscreen }: Props) => {
  const { changeHotKeys } = React.useContext(AppContext);
  const {
    currentMedia: { path, viewedCount }, update,
  } = React.useContext(MediaContext);
  const [changedAttr, setChangedAttr] = React.useState({});
  const timerId = React.useRef(null);
  const [isPlaying, setPlaying] = React.useState(false);
  const [videoLength, setVideoLength] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>();
  const [position, positionKeyMap, positionHandlers] = useCurrentPosition("video", 0, videoLength)
  const [bookmarks, bookmarksKeyMap, bookmarksHandlers] = useBookmarks(position, positionHandlers.MOVE_POSITION)

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;

    setVideoLength(Math.ceil(videoRef.current.duration));
  };

  const handleChangeSec = throttle(() => {
    if (!videoRef.current) return

    const nextPosition = Math.ceil(videoRef.current.currentTime)
    positionHandlers.MOVE_POSITION(nextPosition);
  }, 1000);

  React.useEffect(() => {
    handleTogglePlay();
  }, []);

  React.useEffect(
    () => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = position;
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

  React.useEffect(
    () => {
      autoSave({ currentPosition: position, bookmarks });
    },
    [position, bookmarks]
  );

  React.useEffect(
    () => {
      const video = videoRef.current
      if (!video) return;

      if (Math.abs(video.currentTime - position) > 1) {
        video.currentTime = position
      };
    },
    [position]
  );

  const handlers = {
    ...positionHandlers,
    ...bookmarksHandlers,
    TOGGLE_PLAY: handleTogglePlay,
    TOGGLE_FULL_SCREEN: handleFullscreen,
  };

  React.useEffect(
    () => {
      changeHotKeys({ keyMap: { ...keyMap, ...positionKeyMap, ...bookmarksKeyMap }, handlers });
    },
    [videoLength, position]
  );

  const extendActions = [
    { key: "play", content: <Icon type={isPlaying ? "stop" : "caret-right"} />, action: handlers.TOGGLE_PLAY }
  ]

  const [actionBar, fadeOutHandler] = useActionBar(position, { min: 0, max: videoLength }, bookmarks, handlers, formatSeconds, extendActions)

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
      {actionBar}
    </>
  );
};

export default VideoViewer;
