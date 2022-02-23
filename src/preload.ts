import path from "path";
import { contextBridge, dialog, shell, ipcRenderer } from "electron";

import db from "./preload/db";
import storage from "./preload/storage";

contextBridge.exposeInMainWorld("shokushu2API", {
  dialog,
  db,
  storage,
  filename: async () => {
    const result = await ipcRenderer.invoke("data_file_path");
    return result;
  },
  openMediaDir: (mediaType: "comic" | "video", mediaPath: string) => {
    const targetPath = mediaType === "comic" ? mediaPath : path.dirname(mediaPath);

    shell.openPath(targetPath);
  },
});
