import * as React from "react";
import { Layout, Result, Skeleton } from "antd";

import { find } from "~/renderer/datastore/mediaStore";
import AppContext from "~/renderer/contexts/AppContext";
import { MediumProvider } from "~/renderer/contexts/MediumContext";
import EditorDrawer from "~/renderer/components/drawer/EditorDrawer";
import ChapterDrawer from "~/renderer/components/drawer/ChapterDrawer";

import SideMenu from "./ViewerSideMenu";
import MainPage from "./ViewerMainPage";
import HotKeys from "./ViewerHotKeys";

const Placeholder: React.FC = () => {
  return <Result title="" subTitle="" icon={<></>} extra={<Skeleton />} />;
};

const ViewerScreen: React.FC = () => {
  const [medium, setMedium] = React.useState();
  const { selectedId, update } = React.useContext(AppContext);

  const findMedium = async () => {
    const doc = await find(selectedId);

    if (doc) {
      setMedium(doc);
    } else {
      update({ mode: "list", selectedId: null });
    }
  };

  React.useEffect(() => {
    findMedium();
  }, []);

  if (!medium) return <Placeholder />;

  return (
    <MediumProvider medium={medium}>
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

export default ViewerScreen;
