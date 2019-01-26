// @flow
import * as React from "react";
import styled from "@emotion/styled";

import type { MediaType } from "../MediaType";

const Container = styled("div")`
  height: 80px;
  width: 80px;
  text-align: center;
`;

const VideoThumbnail = ({ path }: { path: string }) => {
  const videoRef: any = React.useRef(null);

  const handleCurrentTime = () => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = Math.floor(videoRef.current.duration / 2);
  };

  return (
    <video
      width="100%"
      muted
      src={path}
      ref={videoRef}
      onLoadedMetadata={handleCurrentTime}
    />
  );
};

const Thumbnail = ({ mediaType, path, thumbnail }: MediaType) => (
  <Container>
    {mediaType === "comic" ? (
      <img height="100%" alt="" src={`${path}/${thumbnail}`} />
    ) : (
      <VideoThumbnail path={path} />
    )}
  </Container>
);

export default Thumbnail;
