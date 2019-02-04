// @flow
import { reduce, isEmpty } from "lodash";

import db from "./db";

import {
  getDirs,
  getFiles,
  remove as removeFromStorage,
  move,
  parsePathStructure,
  getModifiedDate,
} from "~/datastore/storage";
import { formatDate } from "~/utils/date";

type MediaType = "comic" | "video";

const docType = "media";

const initialAttrs = {
  // type: "comic" | "video",
  // title: string,
  /** type: "comic" => size is pages, type: "video" => size is seconds */
  size: null,
  currentPosition: null,
  fav: 0,
  viewedAt: null,
  viewedCount: 0,
  // registeredAt: string,
  authors: [],
  tags: [],
  bookmarks: [],
  path: "",
  thumbnail: null,
};

const buildQuery = (result, value, key: string) => {
  if (!value || isEmpty(value)) return result;

  switch (key) {
    case "mediaType":
      return { ...result, [key]: { $in: value } };
    case "title":
      return { ...result, [key]: { $regex: new RegExp(value) } };
    case "authors":
      return { ...result, [key]: { $elemMatch: { $in: value } } };
    case "tags":
      return {
        ...result,
        $and: value.map(val => ({ [key]: { $elemMatch: val } })),
      };
    default:
  }

  return result;
};

const load = async (condition: Object = {}, sorter: Object, pager: Object) => {
  const query: Object = reduce(condition, buildQuery, { docType });
  const docs = await db.paginate(query, sorter, pager);
  const count = await db.count(query);

  return [docs, count];
};

const promiseSerial = (array, func) =>
  array.reduce(async (prevPromise, element) => {
    await prevPromise;
    return func(element);
  }, Promise.resolve());

const insert = async (
  mediaType: MediaType,
  homeDir: string,
  pathStructure: Object
) => {
  const { path: currentPath, name, ext, base } = pathStructure;
  const attrs = { docType, mediaType, title: name.normalize("NFC") };
  const [doc] = await db("findOne", attrs);

  if (doc) return;

  const registeredAt = formatDate(getModifiedDate(currentPath));
  const newPath = move(currentPath, homeDir, "", base);

  let thumbnail = null;
  if (mediaType === "comic") {
    const fileNames = getFiles(newPath, "comic");
    thumbnail = fileNames[0] && fileNames[0].base;
  }

  await db("insert", {
    ...attrs,
    ...initialAttrs,
    extension: ext,
    path: newPath,
    thumbnail,
    registeredAt,
  });
};

const insertAll = async (mediaType: MediaType, homeDir: string) => {
  const pathStructures =
    mediaType === "comic" ? getDirs(homeDir) : getFiles(homeDir);

  await promiseSerial(pathStructures, pathStructure =>
    insert(mediaType, homeDir, pathStructure)
  );
};

const shouldMove = (oldAttrs, newAttrs) => {
  if (!oldAttrs) return false;
  if (!newAttrs.title && !newAttrs.authors) return false;

  return !(
    oldAttrs.title === newAttrs.title &&
    oldAttrs.authors[0] === newAttrs.authors[0]
  );
};

const update = async (_id: string, attrs: Object, homeDir: string) => {
  const [oldDoc] = await db("findOne", { _id });
  if (!oldDoc) return;
  let newPath = oldDoc.path;

  if (shouldMove(oldDoc, attrs)) {
    const { title, authors } = { ...oldDoc, ...attrs };

    newPath = move(
      oldDoc.path,
      homeDir,
      authors[0] || "",
      `${title}${oldDoc.extension}`
    );
  }

  await db("update", { _id }, { $set: { ...attrs, path: newPath } });
};

const remove = async (_id: string) => {
  const [doc] = await db("findOne", { _id });
  if (!doc) return;

  removeFromStorage(doc.path);
  await db("remove", { _id });
};

const add = async (mediaType: MediaType, homeDir: string, srcPath: string) => {
  const pathStructure = parsePathStructure(srcPath);

  await insert(mediaType, homeDir, pathStructure);
};

export { load, insertAll, update, remove, add };
