// @flow
import * as React from "react";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";

const keyMap = {
  MOVE_NEXT_POSITION: "right",
  MOVE_NEXT_POSITION_HALF: "shift+right",
  MOVE_PREV_POSITION: "left",
  MOVE_PREV_POSITION_HALF: "shift+left",
  MOVE_POSITION: "none",
};

const useCurrentPosition = (
  mediaType: string,
  minPosition: number,
  maxPosition: number
) => {
  const {
    movingStep: { [mediaType]: movingStep },
  } = React.useContext(AppContext);
  const {
    currentMedia: { currentPosition },
  } = React.useContext(MediaContext);
  const movingStepHalf = Math.ceil(movingStep / 2);
  const [position, setPosition] = React.useState(currentPosition || 1);

  const handleMovePosition = (nextPosition: number) => {
    let actualPosition = nextPosition;
    if (actualPosition < minPosition) actualPosition = minPosition;
    if (actualPosition > maxPosition) actualPosition = maxPosition;
    setPosition(actualPosition);
  };

  const handleNextPosition = () => {
    if (position < maxPosition) handleMovePosition(position + movingStep);
  };

  const handleNextPositionHalf = () => {
    if (position < maxPosition) handleMovePosition(position + movingStepHalf);
  };

  const handlePrevPosition = () => {
    if (position > minPosition) handleMovePosition(position - movingStep);
  };

  const handlePrevPositionHalf = () => {
    if (position > minPosition) handleMovePosition(position - movingStepHalf);
  };

  const handlers = {
    MOVE_NEXT_POSITION: handleNextPosition,
    MOVE_NEXT_POSITION_HALF: handleNextPositionHalf,
    MOVE_PREV_POSITION: handlePrevPosition,
    MOVE_PREV_POSITION_HALF: handlePrevPositionHalf,
    MOVE_POSITION: handleMovePosition,
  };

  return [position, keyMap, handlers];
};

export default useCurrentPosition;
