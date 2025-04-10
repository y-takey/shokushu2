import { ElectronAPI } from "@electron-toolkit/preload";
import { IShokushu2API } from "~/types/api";

declare global {
  interface Window {
    electron: ElectronAPI;
    shokushu2API: IShokushu2API;
  }
}
