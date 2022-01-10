import * as fs from "fs-extra";
import sortBy from "lodash/sortBy";
import * as path from "path";

import { PathStructure } from "../types";

const appDir = "synced";

const parsePathStructure = (fullPath: string): PathStructure => ({
  ...path.parse(fullPath),
  path: fullPath,
});

const getObject = (dirPath, filter): PathStructure[] => {
  const paths = fs.readdirSync(dirPath, {
    encoding: "utf8",
    withFileTypes: true,
  });

  return paths.filter(filter).map(({ name }) => parsePathStructure(path.join(dirPath, name)));
};

const getDirs = (dirPath: string): PathStructure[] =>
  getObject(dirPath, (dirent) => dirent.isDirectory() && dirent.name !== appDir);

const videoExtensions = [
  ".mp4",
  ".m4v",
  ".m4a",
  ".mkv",
  ".3gp",
  ".avi",
  ".mov",
  ".ogv",
  ".ogm",
  ".ogg",
  ".oga",
  ".webm",
  ".wav",
];

const comicExtensions = [".jpg", ".jpeg", ".png", ".webp"];

const getFiles = (dirPath: string, targetMedia: "comic" | "video" = "video"): Array<PathStructure> => {
  const files = getObject(dirPath, (dirent) => dirent.isFile());
  const extensions = targetMedia === "comic" ? comicExtensions : videoExtensions;
  const targets = files.filter((file) => extensions.includes(file.ext) && !file.name.startsWith("._"));

  // sort by file name
  return sortBy(targets, "name");
};

const move = (currentPath: string, homePath: string, subDir: string, newName: string): string => {
  const newPath = path.join(homePath, appDir, subDir, newName);

  if (currentPath === newPath) return currentPath;

  fs.moveSync(currentPath, newPath);

  return newPath;
};

// path is directory's or file's
const remove = (targetPath: string): void => {
  fs.removeSync(targetPath);
};

const copy = (src: string, homePath: string, name: string): string => {
  const destPath = path.join(homePath, appDir, name);
  fs.copySync(src, destPath, {
    overwrite: false,
  });
  return destPath;
};

const getModifiedDate = (targetPath: string): Date => {
  const stats = fs.statSync(targetPath);
  return stats.mtime;
};

const api = {
  getDirs,
  getFiles,
  move,
  remove,
  copy,
  parsePathStructure,
  getModifiedDate,
};

export default api;
