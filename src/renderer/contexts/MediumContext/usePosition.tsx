import * as React from "react";

import AppContext from "~/renderer/contexts/AppContext";
import { MediaType } from "~/types";

import { Action } from "./interface";

export type PositionContextType = {
  movePosition: (value: number) => void;
  prevPosition: () => void;
  prevPositionHalf: () => void;
  nextPosition: () => void;
  nextPositionHalf: () => void;
};

const noop = () => {
  // do noting
};

export const initialPositionContext: PositionContextType = {
  movePosition: noop,
  prevPosition: noop,
  prevPositionHalf: noop,
  nextPosition: noop,
  nextPositionHalf: noop,
};

const usePosition = (mediaType: MediaType, dispatch: React.Dispatch<Action>): PositionContextType => {
  const {
    movingStep: { [mediaType]: movingStep },
  } = React.useContext(AppContext);
  const movingStepHalf = Math.ceil(movingStep / 2);

  const movePosition = (position: number) => {
    dispatch({ type: "move_position", payload: { position } });
  };

  const prevPosition = () => {
    dispatch({ type: "prev_position", payload: { offset: movingStep * -1 } });
  };

  const prevPositionHalf = () => {
    dispatch({
      type: "prev_position",
      payload: { offset: movingStepHalf * -1 },
    });
  };

  const nextPosition = () => {
    dispatch({ type: "next_position", payload: { offset: movingStep } });
  };

  const nextPositionHalf = () => {
    dispatch({ type: "next_position", payload: { offset: movingStepHalf } });
  };

  return {
    movePosition,
    prevPosition,
    prevPositionHalf,
    nextPosition,
    nextPositionHalf,
  };
};

export default usePosition;
