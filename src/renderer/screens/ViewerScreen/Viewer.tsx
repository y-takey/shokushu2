import * as React from "react";

import MediumContext from "~/renderer/contexts/MediumContext";

import ComicViewer from "./ComicViewer";
import VideoViewer from "./VideoViewer";

type Props = unknown;

const baseStyle = {
  height: "100%",
  maxHeight: "100%",
  background: "#ffffff",
};

const wrapperStyle = {
  ...baseStyle,
  cursor: "auto",
};

const wrapperStyleZen = {
  ...baseStyle,
  cursor: "none",
};

const delay = (func) => {
  window.setTimeout(func, 500);
};

const Viewer: React.FC<Props> = () => {
  const { mediaType, isFullScreen, setShowActionBar, isShowActionBar } = React.useContext(MediumContext);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const hideRequestId = React.useRef<number | null>(null);
  const timerId = React.useRef<ReturnType<typeof setTimeout>>(null);
  const isMounted = React.useRef(false);

  const clearTimer = React.useCallback(() => {
    if (timerId.current) clearTimeout(timerId.current);
  }, []);

  const handleMouseMove = () => {
    if (hideRequestId.current !== null) return;

    hideRequestId.current = requestAnimationFrame(() => {
      hideRequestId.current = null;

      setShowActionBar(true);

      if (timerId.current !== null) {
        clearTimer();
      }

      timerId.current = setTimeout(() => {
        setShowActionBar(false);
      }, 2000);
    });
  };

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      clearTimer();
      isMounted.current = false;
    };
  }, [clearTimer]);

  React.useEffect(() => {
    if (isFullScreen) {
      delay(() => bodyRef.current?.requestFullscreen());
    } else {
      delay(() => document.fullscreenElement && document.exitFullscreen());
    }
  }, [isFullScreen]);

  return (
    <div style={isShowActionBar ? wrapperStyle : wrapperStyleZen} ref={bodyRef} onMouseMove={handleMouseMove}>
      {mediaType === "comic" ? <ComicViewer /> : <VideoViewer />}
    </div>
  );
};

export default Viewer;
