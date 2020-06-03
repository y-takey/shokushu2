import * as React from "react";
import { List } from "antd";

import ListContext from "~/screens/ListScreen/ListContext";

import ListItem from "./ListItem";

type Props = unknown;

const MediaList: React.FC<Props> = () => {
  const { media, rowIndex } = React.useContext(ListContext);

  return (
    <List
      itemLayout="horizontal"
      dataSource={media}
      style={{ background: "#fff" }}
      renderItem={(item, index) => <ListItem media={item} selected={rowIndex === index} />}
    />
  );
};

export default MediaList;
