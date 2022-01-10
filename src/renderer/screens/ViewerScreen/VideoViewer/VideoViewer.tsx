import * as React from "react";
import { StopOutlined, CaretRightOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import throttle from "lodash/throttle";

import MediumContext from "~/renderer/contexts/MediumContext";
import ActionBar from "~/renderer/screens/ViewerScreen/ActionBar";
import { formatSeconds } from "~/renderer/utils/date";

type Props = unknown;

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

const VideoViewer: React.FC<Props> = () => {
  const { path, currentPosition, loadedVideo, movePosition, isPlaying, togglePlaying } =
    React.useContext(MediumContext);
  const videoRef = React.useRef<HTMLVideoElement | null>();

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;

    loadedVideo(Math.ceil(videoRef.current.duration));
  };

  const handleChangeSec = throttle(() => {
    if (!videoRef.current) return;

    movePosition(Math.ceil(videoRef.current.currentTime));
  }, 1000);

  React.useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = currentPosition;
  }, [path]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Math.abs(video.currentTime - currentPosition) > 1) {
      video.currentTime = currentPosition;
    }
  }, [currentPosition]);

  React.useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const extendActions = [
    {
      key: "play",
      content: isPlaying ? <StopOutlined /> : <CaretRightOutlined />,
      action: togglePlaying,
    },
  ];

  return (
    <>
      <VideoContainer>
        <video
          width="100%"
          src={path}
          ref={videoRef}
          style={videoStyle}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleChangeSec}
        />
      </VideoContainer>
      <ActionBar extendItems={extendActions} positionFormatter={formatSeconds} />
    </>
  );
};

export default VideoViewer;
