// @flow
import * as React from "react";
import { Layout } from "antd";
import styled from "@emotion/styled";

import AppContext from "~/contexts/AppContext";
import MediaList from "~/components/list/MediaList";
import SkeletonList from "~/components/list/SkeletonList";
import { MediaProvider } from "~/contexts/MediaContext";

import DrawerManager from "./DrawerManager";

const Container = styled(Layout.Content)`
  padding: 0px 12px;
`;

const Content = () => {
  const { initialized } = React.useContext(AppContext);

  return (
    <Container>
      {initialized ? (
        <MediaProvider>
          <MediaList />
          <DrawerManager />
        </MediaProvider>
      ) : (
        <SkeletonList />
      )}
    </Container>
  );
};

export default Content;
