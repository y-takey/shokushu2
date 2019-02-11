// @flow
import * as React from "react";
import { List } from "antd";
import styled from "@emotion/styled";

import MediaContext from "~/contexts/MediaContext";

import ListItem from "./ListItem";
import Pager from "./Pager";
import Sorter from "./Sorter";

const Container = styled("div")`
  display: flex;
  height: 100%;
  flex-flow: column;
`;

const ListContainer = styled("div")`
  flex-basis: 0;
  flex-grow: 1;
  overflow-y: scroll;
`;

const Control = styled("div")`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

const MediaList = () => {
  const { media, mediaCount } = React.useContext(MediaContext);

  return (
    <Container>
      <Control>
        <div>
          <Sorter />
        </div>
        <div>
          <Pager totalCount={mediaCount} />
        </div>
      </Control>
      <ListContainer>
        <List
          itemLayout="horizontal"
          dataSource={media}
          renderItem={item => <ListItem {...item} />}
        />
      </ListContainer>
    </Container>
  );
};

export default MediaList;
