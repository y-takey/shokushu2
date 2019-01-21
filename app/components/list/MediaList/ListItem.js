// @flow
import * as React from "react";
import { List, Icon, Row, Col, Tag, Rate } from "antd";
import styled from "@emotion/styled";

import type { MediaType } from "./MediaType";

type BodyProps = {
  type: "comic" | "video",
  fav: number,
  viewedAt: string,
  viewedCount: number,
  author: string,
  tags: Array<any>
};

const MarginedRow = styled(Row)`
  margin-top: 6px;
`;

const IconText = ({ type, text }: { type: string, text: any }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const Thumbnail = ({
  path,
  thumbnail
}: {
  path: string,
  thumbnail: string
}) => <img height={80} alt="" src={`${path}${thumbnail}`} />;

const Body = ({
  type,
  fav,
  viewedAt,
  viewedCount,
  author,
  tags
}: BodyProps) => (
  <div>
    <MarginedRow>
      <Col span={24}>
        <Icon
          type={type === "video" ? "video-camera" : "file-jpg"}
          style={{ marginRight: 16 }}
        />
        {tags.map(tag => (
          <Tag color="blue" style={{ fontSize: 10 }}>
            {tag}
          </Tag>
        ))}
      </Col>
    </MarginedRow>
    <MarginedRow>
      <Col span={4}>
        <Rate disabled value={fav} style={{ color: "#ffadd2", fontSize: 14 }} />
      </Col>
      <Col span={4}>
        <IconText type="play-circle" text={`${viewedCount} (${viewedAt})`} />
      </Col>
      <Col span={16}>
        <IconText type="solution" text={author} />
      </Col>
    </MarginedRow>
  </div>
);

const ListItem = ({ title, path, thumbnail, ...otherProps }: MediaType) => (
  <List.Item key={title}>
    <List.Item.Meta
      avatar={<Thumbnail {...{ path, thumbnail }} />}
      title={<a href="#">{title}</a>}
      description={<Body {...otherProps} />}
    />
  </List.Item>
);

export default ListItem;
