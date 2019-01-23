// @flow
import * as React from "react";
import { Row, Col, Icon } from "antd";

type Props = {
  bodyRef: any
};

const ComicActionBar = ({ bodyRef }: Props) => {
  const handleFullScreen = () => {
    if (bodyRef.current) bodyRef.current.webkitRequestFullScreen();
  };

  return (
    <Row
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        color: "#1890ff",
        width: "45%",
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
};

export default ComicActionBar;
