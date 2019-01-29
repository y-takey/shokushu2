// @flow
import db from "./db";

import { getFiles } from "~/datastore/storage";

type MediaType = "comic" | "video";

const docType = "media";
const condition = { docType };

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

const formatDate = date =>
  date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const load = async () => {
  const [docs] = await db("find", condition);

  return docs;
};

const promiseSerial = (array, func) =>
  array.reduce(async (prevPromise, element) => {
    await prevPromise;
    return func(element);
  }, Promise.resolve());

const insert = async (
  mediaType: MediaType,
  dir: string,
  pathStructure: Object
) => {
  const { path, name, ext } = pathStructure;
  const attrs = { docType, mediaType, title: name };
  const [doc] = await db("findOne", attrs);

  if (doc) return;

  let thumbnail = null;
  if (mediaType === "comic") {
    const fileNames = getFiles(path, "comic");
    thumbnail = fileNames[0] && fileNames[0].path;
  }

  await db("insert", {
    ...attrs,
    ...initialAttrs,
    extension: ext,
    path,
    thumbnail,
    registeredAt: formatDate(new Date()),
  });
};

const insertAll = async (
  mediaType: MediaType,
  dir: string,
  pathStructures: Array<Object>
) => {
  await promiseSerial(pathStructures, pathStructure =>
    insert(mediaType, dir, pathStructure)
  );
};

const update = async (_id: string, attrs: Object) => {
  await db("update", { _id }, { $set: attrs });
};

export { load, insertAll, update };
