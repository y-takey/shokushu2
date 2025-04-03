import * as React from "react";

type TimeoutCallback = () => void;

const useTimeout = (callback: TimeoutCallback, delay: number | null | undefined): void => {
  const savedCallback = React.useRef<TimeoutCallback>(callback);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }

    if (delay !== null) {
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
    return () => {};
  }, [delay]);
};

export default useTimeout;
