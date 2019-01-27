// @flow
import * as React from "react";
import { Layout } from "antd";
import styled from "@emotion/styled";

import { AppProvider } from "~/contexts/AppContext";

import HotKeys from "./HotKeys";
import SideMenu from "./SideMenu";
import Content from "./Content";

const FullLayout = styled(Layout)`
  min-height: 100vh;
`;

const App = () => (
  <AppProvider>
    <HotKeys />
    <FullLayout>
      <SideMenu />
      <Layout>
        <Content />
      </Layout>
    </FullLayout>
  </AppProvider>
);

export default App;
