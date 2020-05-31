import * as React from "react";
import { List } from "antd";

import { Media } from "~/types";

import ListItem from "./ListItem";

interface Props {
  media: Media[];
}

const MediaList: React.FC<Props> = ({ media }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={media}
      style={{ background: "#fff" }}
      renderItem={item => <ListItem media={item} />}
    />
  );
};

export default MediaList;
