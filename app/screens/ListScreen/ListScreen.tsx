import * as React from "react";
import { Layout, Row, Col } from "antd";

import Header from "~/components/Header";

import { ListProvider } from "./ListContext";
import MediaList from "./MediaList";
import ListSideMenu from "./ListSideMenu";
import HotKeys from "./ListHotKeys";
import PageControler from "./PageControler";
import SortControler from "./SortControler";
import AuthorFilterModal from "./AuthorFilterModal";
import DrawerManager from "./DrawerManager";

const ListScreen: React.FC = () => {
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
            <MediaList />
          </Layout.Content>
        </Layout>
      </Layout>
      <HotKeys />
      <DrawerManager />
      <AuthorFilterModal />
    </ListProvider>
  );
};

export default ListScreen;
