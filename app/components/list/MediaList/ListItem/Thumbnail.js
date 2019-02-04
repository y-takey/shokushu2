// @flow
import * as React from "react";
import styled from "@emotion/styled";

import type { MediaType } from "../MediaType";

const Container = styled("div")`
  height: 80px;
  width: 80px;
  text-align: center;
`;

const ComicThumbnail = ({
  path,
  thumbnail,
}: {
  path: string,
  thumbnail: ?string
}) => {
  if (!thumbnail) return null;

  return <img height="100%" alt="" src={`file://${path}/${thumbnail}`} />;
};

const VideoThumbnail = ({
  path,
  bookmarks,
}: {
  path: string,
  bookmarks: Array<number>
}) => {
  const videoRef: any = React.useRef(null);

  const handleCurrentTime = () => {
    if (!videoRef.current) return;
    const thumbnailPosition = bookmarks.length
      ? bookmarks[0]
      : Math.floor(videoRef.current.duration / 2);

    videoRef.current.currentTime = thumbnailPosition;
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

const Thumbnail = ({ mediaType, path, thumbnail, bookmarks }: MediaType) => (
  <Container>
    {mediaType === "comic" ? (
      <ComicThumbnail path={path} thumbnail={thumbnail} />
    ) : (
      <VideoThumbnail path={path} bookmarks={bookmarks} />
    )}
  </Container>
);

export default Thumbnail;
