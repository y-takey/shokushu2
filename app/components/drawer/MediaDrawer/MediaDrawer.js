// @flow
import * as React from "react";
import { Row, Col, Card, Icon } from "antd";

import useDrawer from "~/components/drawer/useDrawer";

import data from "~/components/list/MediaList/mockData";

const MediaViewer = () => {
  const { path } = data[0];
  const bodyRef: any = React.useRef(null);
  const handleFullScreen = () => {
    if (bodyRef.current) bodyRef.current.webkitRequestFullScreen();
  };

  const actionBar = (
    <Row
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "#1890ff",
        width: "45%"
      }}
    >
      <Col span={2}>
        <Icon type="play-circle" />
      </Col>
      <Col span={2}>
        <Icon type="fullscreen" onClick={handleFullScreen} />
      </Col>
    </Row>
  );

  const cover = (
    <div style={{ height: "calc(80vh - 2px)", maxHeight: "calc(80vh - 2px)" }}>
      <div style={{ height: "100%", maxHeight: "100%" }} ref={bodyRef}>
        <Row style={{ height: "100%", maxHeight: "100%" }}>
          <Col
            span={12}
            style={{
              height: "100%",
              textAlign: "right",
              backgroundColor: "black"
            }}
          >
            <img alt="example" height="100%" src={`${path}002.jpg`} />
          </Col>
          <Col
            span={12}
            style={{
              height: "100%",
              textAlign: "left",
              backgroundColor: "black"
            }}
          >
            <img alt="example" height="100%" src={`${path}001.jpg`} />
          </Col>
        </Row>
        {actionBar}
      </div>
    </div>
  );

  return (
    <div style={{ height: "80vh", maxHeight: "80vh" }}>
      <Card
        style={{ height: "100%", maxHeight: "100%", boxSizing: "border-box" }}
        cover={cover}
      />
    </div>
  );
};

const MediaDrawer = useDrawer(MediaViewer, {
  title: "Media",
  icon: "file-jpg",
  placement: "right",
  width: "100%"
});

export default MediaDrawer;
