import * as React from "react";
import { Layout } from "antd";

import MediaContext from "~/contexts/MediaContext";
import { MediumProvider } from "~/contexts/MediumContext";

import SideMenu from "./ViewerSideMenu";
import MainPage from "./ViewerMainPage";
import HotKeys from "./ViewerHotKeys";

const ViewerContainer = () => {
  const { currentMedia } = React.useContext(MediaContext);

  return (
    <MediumProvider medium={currentMedia}>
      <Layout>
        <SideMenu />
        <MainPage />
      </Layout>
      <HotKeys />
    </MediumProvider>
  );
};

export default ViewerContainer;
