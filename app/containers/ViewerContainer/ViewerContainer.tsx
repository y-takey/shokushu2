import * as React from "react";
import { Layout, Result, Skeleton } from "antd";

import MediaContext from "~/contexts/MediaContext";
import { MediumProvider } from "~/contexts/MediumContext";
import EditorDrawer from "~/components/drawer/EditorDrawer";
import ChapterDrawer from "~/components/drawer/ChapterDrawer";

import SideMenu from "./ViewerSideMenu";
import MainPage from "./ViewerMainPage";
import HotKeys from "./ViewerHotKeys";

const Placeholder: React.FC = () => {
  return <Result title="" subTitle="" icon={<></>} extra={<Skeleton />} />;
};

const ViewerContainer: React.FC = () => {
  const { currentMedia } = React.useContext(MediaContext);

  if (!currentMedia) return <Placeholder />;

  return (
    <MediumProvider medium={currentMedia}>
      <Layout>
        <SideMenu />
        <MainPage />
      </Layout>
      <EditorDrawer />
      <ChapterDrawer />
      <HotKeys />
    </MediumProvider>
  );
};

export default ViewerContainer;
