// @flow
import * as React from "react";
import { List } from "antd";

import ListItem from "./ListItem";

import data from "./mockData";

const MediaList = () => (
  <List
    itemLayout="horizontal"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      position: "both",
      pageSize: 10
    }}
    dataSource={data}
    renderItem={item => <ListItem {...item} />}
  />
);

export default MediaList;
