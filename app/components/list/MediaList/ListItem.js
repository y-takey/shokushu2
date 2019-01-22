// @flow
import * as React from "react";
import { List, Icon, Row, Col, Tag } from "antd";
import Rate from "antd/lib/rate";
import styled from "@emotion/styled";

import IconText from "~/components/text/IconText";

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
          <Tag color="blue" style={{ fontSize: 10 }} key={tag}>
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
        <IconText icon="play-circle" text={`${viewedCount} (${viewedAt})`} />
      </Col>
      <Col span={16}>
        <IconText icon="solution" text={author} />
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
