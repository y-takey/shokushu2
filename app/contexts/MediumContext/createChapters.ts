import sortBy from "lodash/sortBy";

import getFileName from "~/utils/getFileName";
import { Chapter } from "~/types";

const createChapters = (pagePaths: string[]): Chapter[] => {
  const chapterMap = pagePaths.reduce((result, pagePath, index) => {
    const parts = getFileName(pagePath).split("_");

    if (parts.length < 2) return result;

    const chapterNo = parts[0];

    if (result[chapterNo]) return result;

    // eslint-disable-next-line no-param-reassign
    result[chapterNo] = { chapterNo, headPath: pagePath, headIndex: index };

    return result;
  }, {});

  return sortBy(Object.values(chapterMap), "headIndex");
};

export default createChapters;
