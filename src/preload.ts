import path from "path";
import { contextBridge, dialog, shell } from "electron";

import db from "./preload/db";
import storage from "./preload/storage";

contextBridge.exposeInMainWorld("shokushu2API", {
  dialog,
  db,
  storage,
  openMediaDir: (mediaType: "comic" | "video", mediaPath: string) => {
    const targetPath = mediaType === "comic" ? mediaPath : path.dirname(mediaPath);

    shell.openPath(targetPath);
  },
});
