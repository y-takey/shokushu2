// @flow

export type MediaType = {
  type: "comic" | "video",
  title: string,
  fav: number,
  viewedAt: string,
  viewedCount: number,
  author?: string,
  tags: Array<any>,
  path: string,
  thumbnail: string
};
