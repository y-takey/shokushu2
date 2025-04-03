import { Media } from "~/types";

export type State = Media & {
  minPosition: number;
  isChanged: boolean;
};

export type Action =
  | { type: "change_range"; payload: { min: number; max: number } }
  | { type: "update"; payload: Partial<Media> }
  | { type: "move_position"; payload: { position: number } }
  | { type: "prev_position"; payload: { offset: number } }
  | { type: "next_position"; payload: { offset: number } }
  | { type: "add_bookmark" }
  | { type: "prev_bookmark" }
  | { type: "next_bookmark" }
  | { type: "saved" };
