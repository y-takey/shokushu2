import * as React from "react";

import { Chapter } from "~/types";

import { Action } from "./interface";
import createChapters from "./createChapters";

export type ChaptersContextType = {
  chapters: Chapter[];
  isShowChapters: boolean;
  toggleChapters: () => void;
  hideChapters: () => void;
  prevChapter: () => void;
  nextChapter: () => void;
};

const noop = () => {};

export const initialChaptersContext: ChaptersContextType = {
  chapters: [],
  isShowChapters: false,
  toggleChapters: noop,
  hideChapters: noop,
  prevChapter: noop,
  nextChapter: noop,
};

type HookValue = ChaptersContextType & {
  updateChapters: (pages: string[]) => void;
};

const useChapters = (currentPosition: number, dispatch: React.Dispatch<Action>): HookValue => {
  const [chapters, setChapters] = React.useState<Chapter[]>([]);
  const [isShowChapters, setShowChapters] = React.useState(false);
  const chapterPositions = React.useRef<number[]>([]);
  const chapterPositionsReversed = React.useRef<number[]>([]);

  const toggleChapters = () => {
    setShowChapters((currentVal) => !currentVal);
  };

  const hideChapters = () => {
    setShowChapters(false);
  };

  const updateChapters = (pages: string[]) => {
    const chapterData = createChapters(pages);
    setChapters(chapterData);
    // for moving next/prev
    chapterPositions.current = chapterData.map(({ headIndex }) => headIndex + 1);
    chapterPositionsReversed.current = chapterPositions.current.slice().reverse();
  };

  const prevChapter = () => {
    const position = chapterPositionsReversed.current.find((pos) => pos < currentPosition);

    if (!position) return;

    dispatch({ type: "move_position", payload: { position } });
  };

  const nextChapter = () => {
    const position = chapterPositions.current.find((pos) => pos > currentPosition);

    if (!position) return;

    dispatch({ type: "move_position", payload: { position } });
  };

  return {
    chapters,
    isShowChapters,
    updateChapters,
    toggleChapters,
    hideChapters,
    prevChapter,
    nextChapter,
  };
};

export default useChapters;
