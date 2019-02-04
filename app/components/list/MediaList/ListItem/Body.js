// @flow
import * as React from "react";
import { Icon, Row, Col, Tag, Popconfirm, Button } from "antd";
import styled from "@emotion/styled";

import IconText from "~/components/text/IconText";
import Favorite from "~/components/input/Favorite";
import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { formatSeconds } from "~/utils/date";

import type { MediaType } from "../MediaType";

const MarginedRow = styled(Row)`
  margin-top: 6px;
`;

const Cell = styled(Col)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const formatSize = (mediaType, size) => {
  if (!size) return "-";

  return mediaType === "video" ? formatSeconds(size) : `${size} pages`;
};

const Body = ({
  _id,
  mediaType,
  fav,
  registeredAt,
  viewedAt,
  viewedCount,
  authors,
  tags,
  size,
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
        <Cell span={24}>
          <Icon
            type={mediaType === "video" ? "video-camera" : "file-jpg"}
            style={{ marginRight: 16 }}
          />
          {tags.map(tag => (
            <Tag color="blue" style={{ fontSize: 10 }} key={tag}>
              <IconText icon="tag" text={tag} />
            </Tag>
          ))}
        </Cell>
      </MarginedRow>
      <MarginedRow gutter={8}>
        <Cell span={4}>
          <Favorite disabled value={fav} style={{ fontSize: 14 }} />
        </Cell>
        <Cell span={4}>
          <IconText icon="solution" text={authors.join("")} />
        </Cell>
        <Cell span={4}>
          <IconText icon="plus" text={registeredAt} />
        </Cell>
        <Cell span={4}>
          <IconText
            icon="caret-right"
            text={`${viewedCount} (${viewedAt || " - "})`}
          />
        </Cell>
        <Cell span={4}>
          <IconText icon="database" text={formatSize(mediaType, size)} />
        </Cell>
        <Cell span={4} style={{ textAlign: "right" }}>
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
        </Cell>
      </MarginedRow>
    </div>
  );
};

export default Body;
