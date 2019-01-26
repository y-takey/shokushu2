// @flow
import * as React from "react";
import { Icon, Row, Col, Tag } from "antd";
import Rate from "antd/lib/rate";
import styled from "@emotion/styled";

import IconText from "~/components/text/IconText";

import type { MediaType } from "../MediaType";

const MarginedRow = styled(Row)`
  margin-top: 6px;
`;

const Body = ({
  mediaType,
  fav,
  viewedAt,
  viewedCount,
  author,
  tags,
}: MediaType) => (
  <div>
    <MarginedRow>
      <Col span={24}>
        <Icon
          type={mediaType === "video" ? "video-camera" : "file-jpg"}
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
        <IconText
          icon="play-circle"
          text={`${viewedCount} (${viewedAt || " - "})`}
        />
      </Col>
      <Col span={16}>
        <IconText icon="solution" text={author} />
      </Col>
    </MarginedRow>
  </div>
);

export default Body;
