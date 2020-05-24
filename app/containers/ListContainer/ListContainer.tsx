import * as React from "react";
import { Layout, Row, Col } from "antd";

import MediaContext from "~/contexts/MediaContext";
import { ListProvider } from "~/contexts/ListContext";
import Header from "~/components/Header";
import MediaList from "~/components/list/MediaList";

import ListSideMenu from "./ListSideMenu";
import HotKeys from "./ListHotKeys";
import PageControler from "./PageControler";
import SortControler from "./SortControler";
import AuthorFilterModal from "./AuthorFilterModal";

const ListContainer: React.FC = () => {
  const { media } = React.useContext(MediaContext);

  return (
    <ListProvider>
      <Layout>
        <ListSideMenu />
        <Layout>
          <Header>
            <Row justify="space-around" align="middle">
              <Col span={8}>
                <SortControler />
              </Col>
              <Col span={16} style={{ textAlign: "right" }}>
                <PageControler />
              </Col>
            </Row>
          </Header>
          <Layout.Content
            style={{
              maxHeight: "calc(100vh - 64px)",
              overflow: "scroll",
              padding: "8px 16px",
            }}
          >
            <MediaList media={media} />
          </Layout.Content>
        </Layout>
      </Layout>
      <HotKeys />
      <AuthorFilterModal />
    </ListProvider>
  );
};

export default ListContainer;
