import path from "path";
import { contextBridge, shell, clipboard, ipcRenderer } from "electron";

import db from "./preload/db";
import storage from "./preload/storage";

contextBridge.exposeInMainWorld("shokushu2API", {
  db,
  storage,
  dialog: {
    showOpenDialogSync: async (options) => {
      const result = await ipcRenderer.invoke("show_open_dialog", options);
      return result;
    },
  },
  filename: async () => {
    const result = await ipcRenderer.invoke("data_file_path");
    return result;
  },
  openMediaDir: (mediaType: "comic" | "video", mediaPath: string) => {
    const targetPath = mediaType === "comic" ? mediaPath : path.dirname(mediaPath);

    shell.openPath(targetPath);
  },
  copyMediaFolderPath: (mediaType: "comic" | "video", mediaPath: string) => {
    const targetPath = mediaType === "comic" ? mediaPath : path.dirname(mediaPath);

    clipboard.writeText(`'${targetPath}'`);
  },
});
