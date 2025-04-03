import { Media, MediaType, Tags, Bookmarks } from "./media";
import { Sorter, Pager, PathStructure } from "./api";

export type { Media, MediaType, Tags, Bookmarks };
export type { Sorter, Pager, PathStructure };

export type DocType = "setting" | "media" | "authors" | "tags";

export type Mode = "list" | "search" | "setting" | "tags" | "view" | "edit" | "video" | "comic";

export type Condition = {
  mediaType: MediaType[];
  title: string;
  fav: number | null;
  authors: string[];
  tags: string[];
  isStarred: boolean;
  isTodo: boolean;
};

export type Setting = {
  mode: Mode;
  selectedId: string | null;
  videoDir: null;
  comicDir: null;
  condition: Condition;
  sorter: Sorter;
  pager: Pager;
  autoFullscreen: boolean;
  movingStep: { [key in MediaType]: number };
};

export type TagGroup = {
  tag: string;
  category: string;
};

export type KeyMap = {
  [key: string]: string;
};

export type Handlers = {
  [key: string]: () => void;
};

export type Chapter = {
  chapterNo: string;
  headPath: string;
  headIndex: number;
};
