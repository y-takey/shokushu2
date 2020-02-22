import * as React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  VideoCameraOutlined,
  FileJpgOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Row, Col, Popconfirm, Button } from "antd";
import styled from "@emotion/styled";

import IconText from "~/components/text/IconText";
import Favorite from "~/components/input/Favorite";
import TagLabels from "~/components/list/TagLabels";
import MediumContext from "~/contexts/MediumContext";
import { formatSeconds } from "~/utils/date";
import { Media } from "~/types";

interface Props {
  media: Media;
}

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

const SmallText = ({ text }: { text: any }) => (
  <span
    style={{
      fontSize: "0.9em",
    }}
  >
    {text}
  </span>
);

const Body: React.FC<Props> = ({ media }) => {
  const {
    mediaType,
    fav,
    registeredAt,
    viewedAt,
    viewedCount,
    authors,
    tags,
    size,
  } = media;
  const { edit, openFolder, remove } = React.useContext(MediumContext);

  const MediaIcon =
    mediaType === "video" ? VideoCameraOutlined : FileJpgOutlined;

  return (
    <div>
      <MarginedRow>
        <Cell span={24}>
          <MediaIcon style={{ marginRight: 16 }} />
          <TagLabels tags={tags} size="small" />
        </Cell>
      </MarginedRow>
      <MarginedRow gutter={8}>
        <Cell span={4}>
          <Favorite disabled value={fav} style={{ fontSize: 14 }} />
        </Cell>
        <Cell span={4}>
          <IconText
            icon="solution"
            text={<SmallText text={authors.join("")} />}
          />
        </Cell>
        <Cell span={4}>
          <IconText icon="plus" text={<SmallText text={registeredAt} />} />
        </Cell>
        <Cell span={4}>
          <IconText
            icon="caret-right"
            text={<SmallText text={`${viewedCount} (${viewedAt || " - "})`} />}
          />
        </Cell>
        <Cell span={4}>
          <IconText
            icon="database"
            text={<SmallText text={formatSize(mediaType, size)} />}
          />
        </Cell>
        <Cell span={4} style={{ textAlign: "right" }}>
          <Button.Group style={{ marginRight: 16 }}>
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              size="small"
              onClick={edit}
            />
            <Button
              type="primary"
              ghost
              icon={<FolderOpenOutlined />}
              size="small"
              onClick={openFolder}
            />
          </Button.Group>
          <Popconfirm
            title="Are you sure delete this media?"
            placement="left"
            onConfirm={remove}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />} size="small" />
          </Popconfirm>
        </Cell>
      </MarginedRow>
    </div>
  );
};

export default Body;
