import { Media } from "~/types";

export const openMediaFolder = (media: Media): void => {
  const { mediaType, path } = media;
  window.shokushu2API.openMediaDir(mediaType, path);
};

export const copyMediaFolderPath = (media: Media): void => {
  const { mediaType, path } = media;
  window.shokushu2API.copyMediaFolderPath(mediaType, path);
};
