import { reduce, isEmpty } from "lodash";

import { formatDate } from "~/renderer/utils/date";
import { MediaType, Media, Condition, Sorter, Pager, PathStructure } from "~/types";

const {
  getDirs,
  getFiles,
  remove: removeFromStorage,
  move,
  parsePathStructure,
  getModifiedDate,
} = window.shokushu2API.storage;

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
  isStarred: false,
  isTodo: true,
};

const buildQuery = (result, value: any, key: string) => {
  if (!value) return result;
  if (value !== true && isEmpty(value)) return result;

  switch (key) {
    case "mediaType":
      return {
        ...result,
        [key]: {
          $in: value,
        },
      };

    case "title":
      return {
        ...result,
        [key]: {
          $regex: new RegExp(value),
        },
      };

    case "authors":
      return {
        ...result,
        [key]: {
          $elemMatch: {
            $in: value,
          },
        },
      };

    case "tags":
      return {
        ...result,
        $and: value.map((val) => ({
          [key]: {
            $elemMatch: val,
          },
        })),
      };

    default:
      return { ...result, [key]: value };
  }

  return result;
};

const load = async (condition: Partial<Condition>, sorter: Sorter, pager: Pager): Promise<[Media[], number]> => {
  const query: Record<string, any> = reduce(condition || {}, buildQuery, { docType });
  const docs = await window.shokushu2API.db.paginate(
    query,
    sorter.key === "title"
      ? sorter
      : [
          sorter,
          {
            key: "title",
            value: "asc",
          },
        ],
    pager
  );
  const count = await window.shokushu2API.db.count(query);
  return [docs, count];
};

const find = async (_id: string) => {
  const [doc] = await window.shokushu2API.db.find({ _id });

  return doc;
};

const promiseSerial = (array, func) =>
  array.reduce(async (prevPromise, element) => {
    await prevPromise;
    return func(element);
  }, Promise.resolve());

const insert = async (mediaType: MediaType, homeDir: string, pathStructure: PathStructure) => {
  const { path: currentPath, name, ext, base } = pathStructure;
  const attrs = {
    docType,
    mediaType,
    title: name.normalize("NFC"),
  };
  const [doc] = await window.shokushu2API.db.find(attrs);
  if (doc) return;
  const registeredAt = formatDate(getModifiedDate(currentPath));

  const newPath = move(currentPath, homeDir, "", base);
  let thumbnail: string | null = null;

  if (mediaType === "comic") {
    const fileNames = getFiles(newPath, "comic");
    thumbnail = fileNames[0] && fileNames[0].base;
  }

  await window.shokushu2API.db.insert({
    ...attrs,
    ...initialAttrs,
    extension: ext,
    path: newPath,
    thumbnail,
    registeredAt,
  });
};

const insertAll = async (mediaType: MediaType, homeDir: string) => {
  const pathStructures = mediaType === "comic" ? getDirs(homeDir) : getFiles(homeDir);
  await promiseSerial(pathStructures, (pathStructure) => insert(mediaType, homeDir, pathStructure));
};

const shouldMove = (oldAttrs, newAttrs) => {
  if (!oldAttrs) return false;
  if (!newAttrs.title && !newAttrs.authors) return false;
  return !(oldAttrs.title === newAttrs.title && oldAttrs.authors[0] === newAttrs.authors[0]);
};

const update = async (_id: string, attrs: Partial<Media>, homeDir: string) => {
  const [oldDoc] = await window.shokushu2API.db.find({ _id });
  if (!oldDoc) return;

  let newPath = oldDoc.path;

  if (shouldMove(oldDoc, attrs)) {
    const { title = "", authors = [] } = {
      ...oldDoc,
      ...attrs,
    };
    newPath = move(oldDoc.path, homeDir, authors[0] || "", `${title}${oldDoc.extension}`);
  }

  await window.shokushu2API.db.update({ _id }, { ...attrs, path: newPath });
};

const remove = async (_id: string) => {
  const [doc] = await window.shokushu2API.db.find({ _id });
  if (!doc) return;

  removeFromStorage(doc.path);
  await window.shokushu2API.db.delete({ _id });
};

const add = async (mediaType: MediaType, homeDir: string, srcPath: string) => {
  const pathStructure = parsePathStructure(srcPath);
  await insert(mediaType, homeDir, pathStructure);
};

export { load, find, insertAll, update, remove, add };
