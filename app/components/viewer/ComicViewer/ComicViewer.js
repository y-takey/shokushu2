// @flow
import * as React from "react";
import { Row, Col } from "antd";

import ActionBar from "./ComicActionBar";

import data from "~/components/list/MediaList/mockData";

type Props = {
  bodyRef: any
};

const ComicViewer = ({ bodyRef }: Props) => {
  const { path } = data[0];

  return (
    <>
      <Row style={{ height: "100%", maxHeight: "100%" }}>
        <Col
          span={12}
          style={{
            height: "100%",
            textAlign: "right",
            backgroundColor: "black",
          }}
        >
          <img alt="example" height="100%" src={`${path}002.jpg`} />
        </Col>
        <Col
          span={12}
          style={{
            height: "100%",
            textAlign: "left",
            backgroundColor: "black",
          }}
        >
          <img alt="example" height="100%" src={`${path}001.jpg`} />
        </Col>
      </Row>
      {<ActionBar bodyRef={bodyRef} />}
    </>
  );
};

export default ComicViewer;
