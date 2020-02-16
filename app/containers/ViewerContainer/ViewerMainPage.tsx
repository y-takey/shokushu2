import * as React from "react";
import { Layout, PageHeader, Row, Col } from "antd";

import MediumContext from "~/contexts/MediumContext";
import IconText from "~/components/text/IconText";
import Favorite from "~/components/input/Favorite";
import TagLabels from "~/components/list/TagLabels";

import Viewer from "./Viewer";

const viewerContainerStyle = {
  height: "80vh",
  maxHeight: "80vh",
};

const ViewerMainPage: React.FC<{}> = () => {
  const { title, mediaType, authors, fav, tags, quit } = React.useContext(
    MediumContext
  );
  const icon = mediaType === "comic" ? "file-jpg" : "video-camera";
  const header = authors.length ? `[${authors.join("")}] ${title}` : title;

  return (
    <Layout>
      <Layout.Header style={{ padding: 0, background: "#ffffff" }}>
        <PageHeader
          onBack={quit}
          title={<IconText icon={icon} text={header} />}
        />
      </Layout.Header>
      <Layout.Content style={{ padding: 16 }}>
        <Row>
          <Col span={24} style={viewerContainerStyle}>
            <Viewer />
          </Col>
        </Row>
        <Row justify="space-between" align="middle" style={{ marginTop: 8 }}>
          <Col span={4}>
            <Favorite disabled value={fav} />
          </Col>
          <Col span={20}>
            <TagLabels tags={tags} />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default ViewerMainPage;
