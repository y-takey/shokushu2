import * as React from "react";
import styled from "@emotion/styled";

import Image from "~/renderer/components/Image";
import Video from "~/renderer/components/Video";
import { Media } from "~/types";

interface Props {
  media: Media;
}

const Container = styled("div")`
  height: 80px;
  width: 80px;
  text-align: center;
`;

const ComicThumbnail: React.FC<Pick<Media, "path" | "thumbnail">> = ({ path, thumbnail }) => {
  if (!thumbnail) return null;

  return <Image height="100%" src={`${path}/${thumbnail}`} />;
};

const VideoThumbnail: React.FC<Pick<Media, "path" | "bookmarks">> = ({ path, bookmarks }) => {
  const videoRef: any = React.useRef(null);

  const handleCurrentTime = () => {
    if (!videoRef.current) return;
    const thumbnailPosition = bookmarks.length ? bookmarks[0] : Math.floor(videoRef.current.duration / 2);

    videoRef.current.currentTime = thumbnailPosition;
  };

  return <Video width="100%" muted src={path} ref={videoRef} onLoadedMetadata={handleCurrentTime} />;
};

const Thumbnail: React.FC<Props> = ({ media }) => {
  const { mediaType, path, thumbnail, bookmarks } = media;

  return (
    <Container>
      {mediaType === "comic" ? (
        <ComicThumbnail path={path} thumbnail={thumbnail} />
      ) : (
        <VideoThumbnail path={path} bookmarks={bookmarks} />
      )}
    </Container>
  );
};

export default Thumbnail;
