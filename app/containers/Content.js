// @flow
import * as React from "react";
import { Layout } from "antd";
import styled from "@emotion/styled";

import AppContext from "~/contexts/AppContext";
import MediaList from "~/components/list/MediaList";
import SkeletonList from "~/components/list/SkeletonList";
import { AuthorsProvider } from "~/contexts/AuthorsContext";
import { TagsProvider } from "~/contexts/TagsContext";
import { MediaProvider } from "~/contexts/MediaContext";

import DrawerManager from "./DrawerManager";

const Container = styled(Layout.Content)`
  padding: 12px 12px;
  height: 100%;
`;

const Content = () => {
  const { initialized } = React.useContext(AppContext);

  return (
    <Container>
      <AuthorsProvider>
        <TagsProvider>
          {initialized ? (
            <MediaProvider>
              <MediaList />
              <DrawerManager />
            </MediaProvider>
          ) : (
            <SkeletonList />
          )}
        </TagsProvider>
      </AuthorsProvider>
    </Container>
  );
};

export default Content;
