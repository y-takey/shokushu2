import React from "react";
import { Layout } from "antd";
import styled from "@emotion/styled";

import { AppProvider } from "./contexts/AppContext";
import Content from "./screens/Content";

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

export default App;
