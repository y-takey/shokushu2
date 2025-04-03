import { Pager, Sorter, Condition, Setting } from "~/types";

export const initialCondition: Condition = {
  mediaType: ["comic", "video"],
  title: "",
  fav: null,
  authors: [],
  tags: [],
  isStarred: false,
  isTodo: false,
};

export const initialSorter: Sorter = {
  key: "registeredAt",
  value: "desc",
};

export const initialPager: Pager = {
  current: 1,
  size: 10,
};

export const initialSetting: Setting = {
  mode: "list",
  selectedId: null,
  videoDir: null,
  comicDir: null,
  condition: initialCondition,
  sorter: initialSorter,
  pager: initialPager,
  autoFullscreen: true,
  movingStep: {
    video: 10,
    comic: 2,
  },
};
