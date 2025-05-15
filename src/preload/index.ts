import path from "path";
import { contextBridge, shell, clipboard, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { IShokushu2API } from "~/types/api";

import db from "./db";
import storage from "./storage";

const getCurrentChapterNo = (mediaPath: string): number => {
  const files = storage.getFiles(mediaPath, "comic");
  if (!files.length) return 0;

  const lastFile = files.at(-1)!;

  return Number(lastFile.name.split("_")[0]);
};

const getNextChapterNo = (mediaPath: string): string => {
  const currentNo = getCurrentChapterNo(mediaPath);

  return (currentNo + 1).toString().padStart(2, "0");
};

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
    if (mediaType !== "comic") {
      clipboard.writeText(`'${path.dirname(mediaPath)}'`);
      return;
    }

    const chapterNo = getNextChapterNo(mediaPath);
    clipboard.writeText(`-n ${chapterNo} -d '${mediaPath}'`);
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
