// @flow
import fs from "fs";
import path from "path";

const getObject = (dirPath, filter): Array<string> => {
  console.log("read path:", dirPath);
  const paths: Array<any> = fs.readdirSync(dirPath, {
    encoding: "utf8",
    withFileTypes: true,
  });

  return paths.filter(filter).map(({ name }) => name);
};

const getDirs = (dirPath: string) =>
  getObject(dirPath, dirent => dirent.isDirectory());

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

const getFiles = (
  dirPath: string,
  targetMedia: "comic" | "video" = "video"
): Array<string> => {
  const fileNames = getObject(dirPath, dirent => dirent.isFile());
  const extensions =
    targetMedia === "comic" ? comicExtensions : videoExtensions;

  // sort by file name
  return fileNames
    .filter(name => extensions.includes(path.extname(name)))
    .sort();
};

export { getDirs, getFiles };
