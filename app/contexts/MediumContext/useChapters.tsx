import * as React from "react";

import { Chapter } from "~/types";

import { Action } from "./interface";
import createChapters from "./createChapters";

export type ChaptersContextType = {
  chapters: Chapter[];
  isShowChapters: boolean;
  toggleChapters: () => void;
  prevChapter: () => void;
  nextChapter: () => void;
};

const noop = () => {
  // do noting
};

export const initialChaptersContext: ChaptersContextType = {
  chapters: [],
  isShowChapters: false,
  toggleChapters: noop,
  prevChapter: noop,
  nextChapter: noop,
};

type HookValue = ChaptersContextType & {
  updateChapters: (pages: string[]) => void;
};

const useChapters = (currentPosition: number, dispatch: React.Dispatch<Action>): HookValue => {
  const [chapters, setChapters] = React.useState([]);
  const [isShowChapters, setShowChapters] = React.useState(false);
  const chapterPositions = React.useRef<number[]>([]);

  const toggleChapters = () => {
    setShowChapters(currentVal => !currentVal);
  };

  const updateChapters = (pages: string[]) => {
    const chapterData = createChapters(pages);
    setChapters(chapterData);
    // for moving next/prev
    chapterPositions.current = chapterData.map(({ headIndex }) => headIndex + 1);
  };

  const prevChapter = () => {
    const position = chapterPositions.current.reverse().find(pos => pos < currentPosition);

    if (!position) return;

    dispatch({ type: "move_position", payload: { position } });
  };

  const nextChapter = () => {
    const position = chapterPositions.current.find(pos => pos > currentPosition);

    if (!position) return;

    dispatch({ type: "move_position", payload: { position } });
  };

  return {
    chapters,
    isShowChapters,
    updateChapters,
    toggleChapters,
    prevChapter,
    nextChapter,
  };
};

export default useChapters;
