import * as React from "react";
import { List } from "antd";
// import { List, Typography } from "antd";
import styled from "@emotion/styled";
// import { css, jsx } from "@emotion/core";

import AppContext from "~/contexts/AppContext";
import { Media } from "~/types";

import Body from "./ListItem/Body";
import Thumbnail from "./ListItem/Thumbnail";
// import { MediaType } from './MediaType';

interface Props {
  media: Media;
}

const Title = styled("a")`
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ListItemMeta = styled(List.Item.Meta)`
  overflow: hidden;
  .ant-list-item-meta-content {
    overflow: hidden;
  }

  .ant-list-item-meta-title {
    margin-bottom: 0px;
    line-height: 18px;
  }
`;

const ListItem: React.FC<Props> = ({ media }) => {
  const { _id, title } = media;
  const { update } = React.useContext(AppContext);

  const handleClick = () => {
    update({
      mode: "view",
      selectedId: _id,
    });
  };

  return (
    <List.Item key={_id}>
      <ListItemMeta
        avatar={<Thumbnail media={media} />}
        title={
          <Title href="#" onClick={handleClick}>
            {title}
          </Title>
        }
        description={<Body media={media} />}
      />
    </List.Item>
  );
};

export default ListItem;
