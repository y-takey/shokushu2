import * as React from "react";
import throttle from "lodash/throttle";

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
  const timerId = React.useRef(null);
  const isMounted = React.useRef(false);

  const clearTimer = () => {
    if (timerId.current) clearTimeout(timerId.current);
  };

  const handleMouseMove = throttle(() => {
    if (!isMounted.current) return;

    setShowActionBar(true);

    clearTimer();

    timerId.current = setTimeout(() => {
      setShowActionBar(false);
    }, 2000);
  }, 1000);

  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      clearTimer();
      isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (isFullScreen) {
      delay(() => bodyRef.current.requestFullscreen());
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
