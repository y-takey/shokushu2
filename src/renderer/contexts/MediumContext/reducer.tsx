import sortBy from "lodash/sortBy";

import { Action, State } from "./interface";

const adjustPosition = (position: number, min?: number, max?: number): number => {
  if (!(min && max)) return position;
  if (position < min) return min;
  if (position > max) return max;

  return position;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "change_range": {
      const { min, max } = action.payload;
      return {
        ...state,
        currentPosition: state.currentPosition || min,
        size: max,
        minPosition: min,
        isChanged: true,
      };
    }
    case "update": {
      const nextState = { ...state, ...action.payload };
      nextState.currentPosition = nextState.currentPosition || state.minPosition;
      nextState.size = state.size || nextState.size;
      return nextState;
    }
    case "move_position":
      return {
        ...state,
        currentPosition: adjustPosition(action.payload.position, state.minPosition, state.size),
        isChanged: true,
      };
    case "prev_position":
    case "next_position":
      return {
        ...state,
        currentPosition: adjustPosition(state.currentPosition + action.payload.offset, state.minPosition, state.size),
        isChanged: true,
      };
    case "add_bookmark": {
      const { bookmarks, currentPosition } = state;
      const newBookmarks = bookmarks.includes(currentPosition)
        ? bookmarks.filter((bm) => bm !== currentPosition)
        : sortBy([...bookmarks, currentPosition]);
      return { ...state, bookmarks: newBookmarks, isChanged: true };
    }
    case "prev_bookmark": {
      const { bookmarks, currentPosition } = state;
      const nextPosition = [...bookmarks].reverse().find((bm) => bm < currentPosition);

      if (!nextPosition) return state;

      return {
        ...state,
        currentPosition: adjustPosition(nextPosition, state.minPosition, state.size),
        isChanged: true,
      };
    }
    case "next_bookmark": {
      const { bookmarks, currentPosition } = state;
      const nextPosition = bookmarks.find((bm) => bm > currentPosition);

      if (!nextPosition) return state;

      return {
        ...state,
        currentPosition: adjustPosition(nextPosition, state.minPosition, state.size),
        isChanged: true,
      };
    }
    case "saved": {
      return { ...state, isChanged: false };
    }
    default:
      return state;
  }
};

export default reducer;
