export type DocType = "setting" | "media" | "authors" | "tags";

export type MediaType = "comic" | "video";

export type Tags = string[];

export type Bookmarks = number[];

export type Media = {
  _id: string;
  docType: DocType;
  mediaType: MediaType;
  title: string;
  /** type: "comic" => size is pages, type: "video" => size is seconds */
  size?: number;
  currentPosition?: number;
  fav: number;
  viewedAt?: string;
  viewedCount: number;
  registeredAt: string;
  authors: string[];
  tags: Tags;
  bookmarks: Bookmarks;
  path: string;
  thumbnail?: string | null | undefined;
  isStarred: boolean;
  isTodo: boolean;
};

export type Mode = "list" | "search" | "setting" | "view" | "edit" | "video" | "comic";

export type Sorter = {
  key: string;
  value: "asc" | "desc";
};

export type Pager = {
  current: number;
  size: number;
};

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

export type KeyMap = {
  [key: string]: string;
};

export type Handlers = {
  [key: string]: Function;
};

export type Chapter = {
  chapterNo: string;
  headPath: string;
  headIndex: number;
};
