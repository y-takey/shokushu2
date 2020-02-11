import * as React from "react";
import { Layout, PageHeader } from "antd";

import MediumContext from "~/contexts/MediumContext";

const ViewerMainPage: React.FC<{}> = () => {
  const { title, quit } = React.useContext(MediumContext);

  return (
    <Layout>
      <Layout.Header style={{ padding: 0 }}>
        <PageHeader onBack={quit} title={title} />
      </Layout.Header>
      <Layout.Content>dummy</Layout.Content>
    </Layout>
  );
};

export default ViewerMainPage;
