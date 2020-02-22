import * as React from "react";
import throttle from "lodash/throttle";

import MediumContext from "~/contexts/MediumContext";
import ComicViewer from "~/components/viewer/ComicViewer";
import VideoViewer from "~/components/viewer/VideoViewer";

const wrapperStyle = {
  height: "100%",
  maxHeight: "100%",
  background: "#ffffff",
};

const delay = func => {
  window.setTimeout(func, 500);
};

const Viewer: React.FC<{}> = () => {
  const { mediaType, isFullScreen, setShowActionBar } = React.useContext(
    MediumContext
  );
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const timerId = React.useRef(null);

  const clearTimer = () => {
    if (timerId.current) clearTimeout(timerId.current);
  };

  const handleMouseMove = throttle(() => {
    setShowActionBar(true);

    clearTimer();

    timerId.current = setTimeout(() => {
      setShowActionBar(false);
    }, 2000);
  }, 1000);

  React.useEffect(() => {
    return clearTimer;
  }, []);

  React.useEffect(() => {
    if (isFullScreen) {
      delay(() => bodyRef.current.requestFullscreen());
    } else if (document.fullscreenElement) {
      delay(() => document.exitFullscreen());
    }
  }, [isFullScreen]);

  return (
    <div style={wrapperStyle} ref={bodyRef} onMouseMove={handleMouseMove}>
      {mediaType === "comic" ? <ComicViewer /> : <VideoViewer />}
    </div>
  );
};

export default Viewer;
