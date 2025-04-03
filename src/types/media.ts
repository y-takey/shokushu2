export type MediaType = "comic" | "video";

export type Tags = string[];

export type Bookmarks = number[];

export type Media = {
  _id: string;
  docType: "media";
  mediaType: MediaType;
  title: string;
  /** type: "comic" => size is pages, type: "video" => size is seconds */
  size?: number;
  currentPosition: number;
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
