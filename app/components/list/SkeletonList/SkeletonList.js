// @flow
import * as React from "react";
import { List } from "antd";
import Skeleton from "antd/lib/skeleton";

const skeleton = (
  <Skeleton
    active
    avatar={{ size: "large", shape: "square" }}
    paragraph={{ rows: 3 }}
  />
);

const dummyData = [skeleton, skeleton, skeleton];

const SkeletonList = () => (
  <List
    itemLayout="horizontal"
    pagination={{
      position: "both",
      pageSize: 10,
    }}
    dataSource={dummyData}
    renderItem={item => item}
  />
);

export default SkeletonList;
