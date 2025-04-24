import sortBy from "lodash/sortBy";

import getFileName from "~/renderer/utils/getFileName";
import { formatDate } from "~/renderer/utils/date";
import { Chapter } from "~/types";

const createChapters = (pagePaths: string[]): Chapter[] => {
  const chapterMap = pagePaths.reduce((result, pagePath, index) => {
    const parts = getFileName(pagePath).split("_");

    if (parts.length < 2) return result;

    const chapterNo = parts[0];

    if (result[chapterNo]) return result;

    const createdAt = formatDate(window.shokushu2API.storage.getModifiedDate(pagePath));
    result[chapterNo] = { chapterNo, headPath: pagePath, headIndex: index, createdAt };

    return result;
  }, {});

  return sortBy(Object.values(chapterMap), "headIndex");
};

export default createChapters;
