import * as React from "react";
import { Icon } from "antd";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import useCurrentPosition from "~/components/viewer/hooks/useCurrentPosition";
import useBookmarks from "~/components/viewer/hooks/useBookmarks";
import useActionBar from "~/components/viewer/hooks/useActionBar";
import useAutoSave from "~/components/viewer/hooks/useAutoSave";
import { formatSeconds } from "~/utils/date";

interface Props {
  handleFullscreen: Function;
}

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

const videoStyle: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  margin: "auto",
};

const VideoViewer: React.FC<Props> = ({ handleFullscreen }) => {
  const { changeHotKeys } = React.useContext(AppContext);
  const {
    currentMedia: { path },
  } = React.useContext(MediaContext);
  const [videoLength, setVideoLength] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement | null>();
  const isPlaying = React.useRef<boolean>(false);
  const [position, positionKeyMap, positionHandlers] = useCurrentPosition(
    "video",
    0,
    videoLength
  );
  const [bookmarks, bookmarksKeyMap, bookmarksHandlers] = useBookmarks(
    position,
    positionHandlers.MOVE_POSITION
  );

  useAutoSave(position, bookmarks, videoLength);

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;

    setVideoLength(Math.ceil(videoRef.current.duration));
  };

  const handleChangeSec = throttle(() => {
    if (!videoRef.current) return;

    const nextPosition = Math.ceil(videoRef.current.currentTime);
    positionHandlers.MOVE_POSITION(nextPosition);
  }, 1000);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      isPlaying.current = true;
    } else {
      videoRef.current.pause();
      isPlaying.current = false;
    }
  };

  // Auto play on mounted
  React.useEffect(() => {
    handleTogglePlay();
  }, []);

  React.useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = position;
  }, [path]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - position) > 1) {
      video.currentTime = position;
    }
  }, [position]);

  const handlers = {
    ...positionHandlers,
    ...bookmarksHandlers,
    TOGGLE_PLAY: handleTogglePlay,
    TOGGLE_FULL_SCREEN: handleFullscreen,
  };

  React.useEffect(() => {
    changeHotKeys({
      keyMap: { ...keyMap, ...positionKeyMap, ...bookmarksKeyMap },
      handlers,
    });
  }, [videoLength, position, bookmarks]);

  const extendActions = [
    {
      key: "play",
      content: <Icon type={isPlaying.current ? "stop" : "caret-right"} />,
      action: handlers.TOGGLE_PLAY,
    },
  ];

  const [actionBar, fadeOutHandler] = useActionBar(
    position,
    { min: 0, max: videoLength },
    bookmarks,
    handlers,
    formatSeconds,
    extendActions
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
      {actionBar}
    </>
  );
};

export default VideoViewer;
