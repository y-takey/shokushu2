import { Media, MediaType, Tags, Bookmarks } from "./media";
import { IShokushu2API, Sorter, Pager, PathStructure } from "./api";

export { Media, MediaType, Tags, Bookmarks };
export { Sorter, Pager, PathStructure };

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

declare global {
  interface Window {
    shokushu2API: IShokushu2API;
  }
}
