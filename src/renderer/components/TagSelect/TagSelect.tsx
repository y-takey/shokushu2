import React, { ComponentProps } from "react";
import { Select } from "antd";
import _ from "lodash";

import { useTags } from "~/renderer/contexts/TagsContext";
import { useTagGroups } from "~/renderer/contexts/TagGroupsContext";

type Props = ComponentProps<typeof Select> & {
  mode?: "multiple" | "tags";
};

const TagSelect: React.FC<Props> = (props) => {
  const { tags } = useTags();
  const { tagGroups } = useTagGroups();
  const options = React.useMemo(() => {
    const categoryMap = Object.fromEntries(tagGroups.map((group) => [group.tag, group.category]));
    const rec = tags.map((name) => ({ value: name, label: name, category: categoryMap[name] || "other" }));
    const groupedRecords = _.groupBy(_.sortBy(rec, "category"), "category");

    return _.map(groupedRecords, (records, category) => ({ label: category, options: records }));
  }, [tags, tagGroups]);

  return <Select style={{ width: "100%" }} options={options} {...props} />;
};

TagSelect.defaultProps = {
  mode: "tags",
};

export default TagSelect;
