// @flow
import * as React from "react";
import { List } from "antd";

import MediaContext from "~/contexts/MediaContext";

import ListItem from "./ListItem";

const MediaList = () => {
  const { media } = React.useContext(MediaContext);

  return (
    <List
      itemLayout="horizontal"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        position: "both",
        pageSize: 10,
      }}
      dataSource={media}
      renderItem={item => <ListItem {...item} />}
    />
  );
};

export default MediaList;
