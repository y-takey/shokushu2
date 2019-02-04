// @flow
import * as React from "react";

const useTimeout = (callback: Function, delay: ?number) => {
  const savedCallback = React.useRef();

  React.useEffect(
    () => {
      savedCallback.current = callback;
    },
    [callback]
  );

  React.useEffect(
    () => {
      function tick() {
        if (savedCallback.current) savedCallback.current();
      }

      if (delay !== null) {
        const id = setTimeout(tick, delay);
        return () => clearTimeout(id);
      }
    },
    [delay]
  );
};

export default useTimeout;
