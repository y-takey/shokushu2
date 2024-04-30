import * as React from "react";
import { Tag } from "antd";

import IconText from "~/renderer/components/IconText";
import { Tags } from "~/types";

interface Props {
  tags: Tags;
  size?: "normal" | "small";
}

const TagLabels: React.FC<Props> = ({ tags, size = "normal" }) => (
  <>
    {tags.map((tag) => (
      <Tag color="blue" style={size === "small" ? { fontSize: 10 } : {}} key={tag}>
        <IconText icon="tag" text={tag} />
      </Tag>
    ))}
  </>
);

export default TagLabels;
