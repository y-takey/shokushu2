// @flow

export type MediaType = {
  _id: string,
  mediaType: "comic" | "video",
  title: string,
  /** type: "comic" => size is pages, type: "video" => size is seconds */
  size: ?number,
  currentPosition: ?number,
  fav: number,
  viewedAt: string,
  viewedCount: number,
  registeredAt: string,
  authors: Array<string>,
  tags: Array<string>,
  bookmarks: Array<any>,
  path: string,
  thumbnail: ?string
};
