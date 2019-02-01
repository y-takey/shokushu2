// @flow
import * as fs from "fs-extra";
import path from "path";

const appDir = "app";

// Dir
// > path.parse("/path/to/foo")
// # => { root: '/', dir: '/path/to', base: 'foo', ext: '', name: 'foo' }

// File
// > path.parse("/path/to/bar.jpg")
// # => { root: '/', dir: '/path/to', base: 'bar.jpg', ext: '.jpg', name: 'bar' }
type PathStructure = {
  path: string,
  root: string,
  dir: string,
  base: string,
  ext: string,
  name: string
};

const parsePathStructure = (fullPath: string): PathStructure => ({
  ...path.parse(fullPath),
  path: fullPath,
});

const getObject = (dirPath, filter): Array<PathStructure> => {
  // $FlowFixMe
  const paths: Array<any> = fs.readdirSync(dirPath, {
    encoding: "utf8",
    withFileTypes: true,
  });

  return paths
    .filter(filter)
    .map(({ name }) => parsePathStructure(path.join(dirPath, name)));
};

const getDirs = (dirPath: string) =>
  getObject(dirPath, dirent => dirent.isDirectory() && dirent.name !== appDir);

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

const sortByName = (a, b) => {
  if (a.name === b.name) return 0;

  return a.name > b.name ? 1 : -1;
};

const getFiles = (
  dirPath: string,
  targetMedia: "comic" | "video" = "video"
): Array<PathStructure> => {
  const files = getObject(dirPath, dirent => dirent.isFile());
  const extensions =
    targetMedia === "comic" ? comicExtensions : videoExtensions;

  // sort by file name
  return files.filter(file => extensions.includes(file.ext)).sort(sortByName);
};

const move = (
  currentPath: string,
  homePath: string,
  subDir: string,
  newName: string
): string => {
  const newPath = path.join(homePath, appDir, subDir, newName);

  if (currentPath === newPath) return currentPath;

  fs.moveSync(currentPath, newPath);

  return newPath;
};

// path is directory's or file's
const remove = (targetPath: string) => {
  fs.removeSync(targetPath);
};

const copy = (src: string, homePath: string, name: string) => {
  const destPath = path.join(homePath, appDir, name);
  fs.copySync(src, destPath, { overwrite: false });
  return destPath;
};

export { getDirs, getFiles, move, remove, copy, parsePathStructure };
