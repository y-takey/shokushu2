import * as React from "react";
import { PageHeader } from "@ant-design/pro-layout";
import { Layout, Row, Col } from "antd";

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
    <span style={{ fontWeight: 400 }}>
      <IconText icon={icon} text={header} />
    </span>
  );
};

const ViewerMainPage: React.FC<Props> = () => {
  const { title, mediaType, authors, fav, tags, quit } = React.useContext(MediumContext);

  return (
    <Layout>
      <Header>
        <PageHeader onBack={quit} title={<HeaderTitle mediaType={mediaType} title={title} authors={authors} />} />
      </Header>
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
