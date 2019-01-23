// @flow
import * as React from "react";
import { Layout } from "antd";
import styled from "@emotion/styled";

import { AppProvider } from "~/contexts/AppContext";
import { SettingProvider } from "~/contexts/SettingContext";

import SideMenu from "./SideMenu";
import Content from "./Content";
import DrawerManager from "./DrawerManager";

const FullLayout = styled(Layout)`
  min-height: 100vh;
`;

const App = () => (
  <AppProvider>
    <SettingProvider>
      <FullLayout>
        <SideMenu />
        <Layout>
          <Content />
        </Layout>
        <DrawerManager />
      </FullLayout>
    </SettingProvider>
  </AppProvider>
);

export default App;
