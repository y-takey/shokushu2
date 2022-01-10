import { Media } from "~/types";

const openMediaFolder = (media: Media): void => {
  const { mediaType, path } = media;
  window.shokushu2API.openMediaDir(mediaType, path);
};

export default openMediaFolder;
