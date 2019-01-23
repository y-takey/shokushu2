// @flow
import * as React from "react";
import { Row, Col, Card, Icon } from "antd";

import ComicViewer from "~/components/viewer/ComicViewer";
import VideoViewer from "~/components/viewer/VideoViewer";

import data from "~/components/list/MediaList/mockData";

const MediaViewer = () => {
  const { type } = data[0];
  const bodyRef: any = React.useRef(null);
  const ViewerComponent = type === "comic" ? ComicViewer : VideoViewer;

  const viewer = (
    <div style={{ height: "calc(80vh - 2px)", maxHeight: "calc(80vh - 2px)" }}>
      <div style={{ height: "100%", maxHeight: "100%" }} ref={bodyRef}>
        <ViewerComponent bodyRef={bodyRef} />
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
