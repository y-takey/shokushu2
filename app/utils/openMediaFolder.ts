import * as path from "path";
import { shell } from "electron";

import { Media } from "~/types";

const openMediaFolder = (media: Media): void => {
  const { mediaType, path: mediaPath } = media;
  const targetPath = mediaType === "comic" ? mediaPath : path.dirname(mediaPath);

  shell.openPath(targetPath);
};

export default openMediaFolder;
