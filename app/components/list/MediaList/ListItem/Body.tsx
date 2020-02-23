import * as React from "react";
import { VideoCameraOutlined, FileJpgOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import styled from "@emotion/styled";

import IconText from "~/components/text/IconText";
import Favorite from "~/components/input/Favorite";
import TagLabels from "~/components/list/TagLabels";
import { formatSeconds } from "~/utils/date";
import { Media } from "~/types";

import ActionButtons from "./ActionButtons";

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
  const { mediaType, fav, registeredAt, viewedAt, viewedCount, authors, tags, size } = media;

  const MediaIcon = mediaType === "video" ? VideoCameraOutlined : FileJpgOutlined;

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
          <IconText icon="solution" text={<SmallText text={authors.join("")} />} />
        </Cell>
        <Cell span={4}>
          <IconText icon="plus" text={<SmallText text={registeredAt} />} />
        </Cell>
        <Cell span={4}>
          <IconText icon="caret-right" text={<SmallText text={`${viewedCount} (${viewedAt || " - "})`} />} />
        </Cell>
        <Cell span={3}>
          <IconText icon="database" text={<SmallText text={formatSize(mediaType, size)} />} />
        </Cell>
        <Cell span={5} style={{ textAlign: "right" }}>
          <ActionButtons />
        </Cell>
      </MarginedRow>
    </div>
  );
};

export default Body;
