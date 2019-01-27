// @flow
import * as React from "react";
import { Card } from "antd";

import ComicViewer from "~/components/viewer/ComicViewer";
import VideoViewer from "~/components/viewer/VideoViewer";
import MediaContext from "~/contexts/MediaContext";

const MediaViewer = () => {
  const { currentMedia } = React.useContext(MediaContext);
  const { mediaType } = currentMedia;
  const bodyRef: any = React.useRef(null);
  const ViewerComponent = mediaType === "comic" ? ComicViewer : VideoViewer;
  const handleFullscreen = () => {
    // $FlowFixMe
    if (document.webkitFullscreenElement) {
      // $FlowFixMe
      document.webkitExitFullscreen();
    } else {
      bodyRef.current.webkitRequestFullScreen();
    }
  };

  const viewer = (
    <div style={{ height: "calc(80vh - 2px)", maxHeight: "calc(80vh - 2px)" }}>
      <div style={{ height: "100%", maxHeight: "100%" }} ref={bodyRef}>
        <ViewerComponent handleFullscreen={handleFullscreen} />
      </div>
    </div>
  );

  return (
    <div style={{ height: "80vh", maxHeight: "80vh" }}>
      <Card
        style={{ height: "100%", maxHeight: "100%", boxSizing: "border-box" }}
        cover={viewer}
      />
    </div>
  );
};

export default MediaViewer;
