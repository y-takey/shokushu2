import * as React from "react";

import MediaContext from "~/contexts/MediaContext";
import { formatToday } from "~/utils/date";

interface Task {
  id: number;
  proc: Function;
}

const useAutoSave = (
  position: number,
  bookmarks: Array<number>,
  size: number
) => {
  const { update } = React.useContext(MediaContext);
  const task = React.useRef<Task | null>();

  React.useEffect(() => {
    const attrs = {
      currentPosition: position,
      bookmarks,
      size,
      viewedAt: formatToday(),
    };

    if (task.current) window.clearTimeout(task.current.id);

    const proc = async () => {
      if (!task.current) return;

      await update(attrs);
      task.current = null;
    };

    task.current = { id: window.setTimeout(proc, 3000), proc };
  }, [position, bookmarks, size]);

  React.useEffect(
    () => () => {
      if (!task.current) return;

      const { id, proc } = task.current;
      window.clearTimeout(id);
      proc();
    },
    []
  );
};

export default useAutoSave;
