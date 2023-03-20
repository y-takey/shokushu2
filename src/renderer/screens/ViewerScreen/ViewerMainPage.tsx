import * as React from "react";
import { Layout, Row, Col, Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import MediumContext from "~/renderer/contexts/MediumContext";
import Header from "~/renderer/components/Header";
import IconText from "~/renderer/components/IconText";
import Favorite from "~/renderer/components/Favorite";
import TagLabels from "~/renderer/components/TagLabels";
import { Media } from "~/types";

import Viewer from "./Viewer";

type Props = unknown;

const viewerContainerStyle = {
  height: "85vh",
  maxHeight: "85vh",
};

const HeaderTitle: React.FC<Pick<Media, "mediaType" | "title" | "authors">> = ({ mediaType, title, authors }) => {
  const icon = mediaType === "comic" ? "file-jpg" : "video-camera";
  const header = authors.length ? `[${authors.join("")}] ${title}` : title;

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <Typography.Title level={3} style={{ margin: 0, fontWeight: 400 }}>
        <IconText icon={icon} text={header} />
      </Typography.Title>
    </div>
  );
};

const PageHeader: React.FC<Props> = () => {
  const { title, mediaType, authors, quit } = React.useContext(MediumContext);

  return (
    <Header>
      <Row wrap={false}>
        <Col flex="none">
          <Button type="text" onClick={quit} size="large" icon={<ArrowLeftOutlined />} />
        </Col>
        <Col flex="auto">
          <HeaderTitle mediaType={mediaType} title={title} authors={authors} />
        </Col>
      </Row>
    </Header>
  );
};

const ViewerMainPage: React.FC<Props> = () => {
  const { fav, tags } = React.useContext(MediumContext);

  return (
    <Layout>
      <PageHeader />
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
