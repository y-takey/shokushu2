import * as React from "react";
import { Tag } from "antd";

import IconText from "~/components/text/IconText";
import { Tags } from "~/types";

interface Props {
  tags: Tags;
  size?: "normal" | "small";
}

const TagLabels: React.FC<Props> = ({ tags, size }) => {
  return (
    <>
      {tags.map(tag => (
        <Tag
          color="blue"
          style={size === "small" ? { fontSize: 10 } : {}}
          key={tag}
        >
          <IconText icon="tag" text={tag} />
        </Tag>
      ))}
    </>
  );
};

TagLabels.defaultProps = {
  size: "normal",
};

export default TagLabels;
