import * as React from "react";
import { List } from "antd";

import ListContext from "~/renderer/screens/ListScreen/ListContext";

import ListItem from "./ListItem";

type Props = unknown;

const MediaList: React.FC<Props> = () => {
  const { media } = React.useContext(ListContext);

  return (
    <List
      itemLayout="horizontal"
      dataSource={media}
      style={{ background: "#fff" }}
      renderItem={(item) => <ListItem media={item} />}
    />
  );
};

export default MediaList;
