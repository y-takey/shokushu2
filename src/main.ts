import path from "path";
import { BrowserWindow, app } from "electron";

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  const execPath =
    process.platform === "win32" ? "../node_modules/electron/dist/electron.exe" : "../node_modules/.bin/electron";

  require("electron-reload")(__dirname, {
    electron: path.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: "exit",
  });
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1240,
    height: 860,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) mainWindow.webContents.openDevTools({ mode: "detach" });
  mainWindow.loadFile("dist/index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });
};

app.whenReady().then(async () => {
  createWindow();
});

app.once("window-all-closed", () => app.quit());

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
