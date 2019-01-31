// @flow
import * as React from "react";
import { Icon, Row, Col, Tag, Popconfirm, Button } from "antd";
import styled from "@emotion/styled";

import IconText from "~/components/text/IconText";
import Favorite from "~/components/input/Favorite";
import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";

import type { MediaType } from "../MediaType";

const MarginedRow = styled(Row)`
  margin-top: 6px;
`;

const Body = ({
  _id,
  mediaType,
  fav,
  viewedAt,
  viewedCount,
  authors,
  tags,
}: MediaType) => {
  const { update } = React.useContext(AppContext);
  const { remove } = React.useContext(MediaContext);

  const handleEdit = () => {
    update({ mode: "edit", selectedId: _id });
  };
  const handleDelete = () => {
    remove(_id);
  };

  return (
    <div>
      <MarginedRow>
        <Col span={24}>
          <Icon
            type={mediaType === "video" ? "video-camera" : "file-jpg"}
            style={{ marginRight: 16 }}
          />
          {tags.map(tag => (
            <Tag color="blue" style={{ fontSize: 10 }} key={tag}>
              <IconText icon="tag" text={tag} />
            </Tag>
          ))}
        </Col>
      </MarginedRow>
      <MarginedRow>
        <Col span={4}>
          <Favorite disabled value={fav} style={{ fontSize: 14 }} />
        </Col>
        <Col span={4}>
          <IconText icon="solution" text={authors.join("")} />
        </Col>
        <Col span={8}>
          <IconText
            icon="play-circle"
            text={`${viewedCount} (${viewedAt || " - "})`}
          />
        </Col>
        <Col span={8} style={{ textAlign: "rightx" }}>
          <Button
            type="primary"
            ghost
            icon="edit"
            size="small"
            style={{ marginRight: 16 }}
            onClick={handleEdit}
          />
          <Popconfirm
            title="Are you sure delete this media?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon="delete" size="small" />
          </Popconfirm>
        </Col>
      </MarginedRow>
    </div>
  );
};

export default Body;
