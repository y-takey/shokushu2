import path from "path";
import { contextBridge, shell, clipboard, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { IShokushu2API } from "~/types/api";

import db from "./db";
import storage from "./storage";

// Custom APIs for renderer
const api: IShokushu2API = {
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
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("shokushu2API", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.shokushu2API = api;
}
