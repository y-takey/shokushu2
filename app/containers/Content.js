// @flow
import * as React from "react";
import { Layout } from "antd";
import styled from "@emotion/styled";

import MediaList from "~/components/list/MediaList";

const Container = styled(Layout.Content)`
  padding: 0px 12px;
`;

const Content = () => (
  <Container>
    <MediaList />
  </Container>
);

export default Content;
