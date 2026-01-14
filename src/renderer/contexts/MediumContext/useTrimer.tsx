import * as React from "react";

export type TrimerContextType = {
  isShowTrimer: boolean;
  toggleTrimer: () => void;
  hideTrimer: () => void;
};

const noop = () => {};

export const initialTrimerContext: TrimerContextType = {
  isShowTrimer: false,
  toggleTrimer: noop,
  hideTrimer: noop,
};

type HookValue = TrimerContextType & {};

const useTrimer = (): HookValue => {
  const [isShowTrimer, setShowTrimer] = React.useState(false);

  const toggleTrimer = () => {
    setShowTrimer((currentVal) => !currentVal);
  };

  const hideTrimer = () => {
    setShowTrimer(false);
  };

  return { isShowTrimer, toggleTrimer, hideTrimer };
};

export default useTrimer;
