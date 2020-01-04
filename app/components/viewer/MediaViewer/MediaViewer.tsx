import * as React from "react";
import { Card, Button } from "antd";

import ComicViewer from "~/components/viewer/ComicViewer";
import VideoViewer from "~/components/viewer/VideoViewer";
import EditorDrawer from "~/components/drawer/EditorDrawer";
import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";

interface WebkitDocument extends Document {
  // exitFullscreen: () => void;
  // mozCancelFullScreen: () => void;
  webkitExitFullscreen: () => void;
  // webkitRequestFullScreen: () => void;
  // fullscreenElement: () => void;
  // mozFullScreenElement: () => void;
  webkitFullscreenElement: () => void;
}

interface WebkitHTMLDivElement extends HTMLDivElement {
  webkitRequestFullScreen: () => void;
}

const viewerContainerStyle = {
  height: "calc(80vh - 2px)",
  maxHeight: "calc(80vh - 2px)",
};

const MediaViewer = () => {
  const { autoFullscreen } = React.useContext(AppContext);
  const { currentMedia } = React.useContext(MediaContext);
  const { mediaType } = currentMedia;
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const [editing, changeEditing] = React.useState(false);
  const ViewerComponent = mediaType === "comic" ? ComicViewer : VideoViewer;
  const webkitDocument = document as WebkitDocument;

  const handleFullscreen = () => {
    if (webkitDocument.webkitFullscreenElement) {
      webkitDocument.webkitExitFullscreen();
    } else {
      (bodyRef.current as WebkitHTMLDivElement).webkitRequestFullScreen();
    }
  };

  React.useEffect(() => {
    if (autoFullscreen) handleFullscreen();
  }, []);

  const handleClose = () => changeEditing(false);

  const viewer = (
    <>
      <div style={viewerContainerStyle}>
        <div style={{ height: "100%", maxHeight: "100%" }} ref={bodyRef}>
          <ViewerComponent handleFullscreen={handleFullscreen} />
        </div>
      </div>
      <div
        style={{
          textAlign: "right",
          marginTop: 8,
        }}
      >
        <Button icon="edit" onClick={() => changeEditing(true)}>
          Edit
        </Button>
      </div>
    </>
  );

  return (
    <div style={{ height: "80vh", maxHeight: "80vh" }}>
      <Card
        style={{ height: "100%", maxHeight: "100%", boxSizing: "border-box" }}
        bodyStyle={{ padding: "0px" }}
        cover={viewer}
      />
      <EditorDrawer onClose={handleClose} visible={editing} />
    </div>
  );
};

export default MediaViewer;
