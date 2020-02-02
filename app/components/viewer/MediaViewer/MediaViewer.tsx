import * as React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Card, Button, Row, Col } from "antd";

import ComicViewer from "~/components/viewer/ComicViewer";
import VideoViewer from "~/components/viewer/VideoViewer";
import EditorDrawer from "~/components/drawer/EditorDrawer";
import Favorite from "~/components/input/Favorite";
import TagLabels from "~/components/list/TagLabels";
import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";

const viewerContainerStyle = {
  height: "calc(80vh - 2px)",
  maxHeight: "calc(80vh - 2px)",
};

const MediaViewer = () => {
  const { autoFullscreen } = React.useContext(AppContext);
  const { currentMedia } = React.useContext(MediaContext);
  const { mediaType, fav, tags } = currentMedia;
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const [editing, changeEditing] = React.useState(false);
  const ViewerComponent = mediaType === "comic" ? ComicViewer : VideoViewer;

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      window.setTimeout(() => {
        bodyRef.current.requestFullscreen();
      }, 500);
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
      <Row justify="space-between" align="middle" style={{ marginTop: 8 }}>
        <Col span={4}>
          <Favorite disabled value={fav} />
        </Col>
        <Col span={18}>
          <TagLabels tags={tags} />
        </Col>
        <Col span={2}>
          <Button icon={<EditOutlined />} onClick={() => changeEditing(true)}>
            Edit
          </Button>
        </Col>
      </Row>
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
