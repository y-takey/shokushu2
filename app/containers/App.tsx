// import * as React from "react";
import React from "react";
import { hot } from "react-hot-loader/root";
import { Layout } from "antd";
import styled from "@emotion/styled";

import { AppProvider } from "~/contexts/AppContext";

import Content from "./Content";

const FullLayout = styled(Layout)`
  min-height: 100vh;
`;

// console.log("[Electron ver]", process.versions.electron);
// console.log("[Node ver]", process.versions.node);

const App = () => (
  <AppProvider>
    <FullLayout>
      <Content />
    </FullLayout>
  </AppProvider>
);

export default hot(App);
