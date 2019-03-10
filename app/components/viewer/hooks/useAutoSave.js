// @flow
import * as React from "react";

import MediaContext from "~/contexts/MediaContext";
import { formatToday } from "~/utils/date";

const useAutoSave = (
  position: number,
  bookmarks: Array<number>,
  size: number
) => {
  const { update } = React.useContext(MediaContext);
  const task = React.useRef<?{ id: TimeoutID, proc: Function }>();

  React.useEffect(
    () => {
      const attrs = {
        currentPosition: position,
        bookmarks,
        size,
        viewedAt: formatToday(),
      };

      if (task.current) clearTimeout(task.current.id);

      const proc = async () => {
        if (!task.current) return;

        await update(attrs);
        task.current = null;
      };

      task.current = { id: setTimeout(proc, 3000), proc };
    },
    [position, bookmarks, size]
  );

  React.useEffect(
    () => () => {
      if (!task.current) return;

      const { id, proc } = task.current;
      clearTimeout(id);
      proc();
    },
    []
  );
};

export default useAutoSave;
