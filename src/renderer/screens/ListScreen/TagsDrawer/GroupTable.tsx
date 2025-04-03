import * as React from "react";
import { Button, Select, Popconfirm, Table, TableColumnsType } from "antd";

import { useTags } from "~/renderer/contexts/TagsContext";
import { useTagCategories } from "~/renderer/contexts/TagCategoriesContext";
import { useTagGroups } from "~/renderer/contexts/TagGroupsContext";
import { TagGroup } from "~/types";
import Header from "./Header";

const GroupTable: React.FC = () => {
  const { tags, add, remove } = useTags();
  const { categories } = useTagCategories();
  const { tagGroups, update } = useTagGroups();
  const categoryOptions = React.useMemo(() => categories.map((name) => ({ value: name, label: name })), [categories]);
  const data = React.useMemo(() => {
    const categoryMap = Object.fromEntries(tagGroups.map((group) => [group.tag, group.category]));
    return tags.map((name) => ({ key: name, tag: name, category: categoryMap[name] || "Other" }));
  }, [tags, tagGroups]);

  const onAdd = React.useCallback(
    (value: string) => {
      add([value]);
    },
    [add]
  );

  const handleChange = (tag: string, category: string) => {
    const unchangeGroups = tagGroups.filter((group) => group.tag !== tag);
    update([...unchangeGroups, { tag, category }]);
  };

  const columns: TableColumnsType<TagGroup> = [
    {
      title: "Tag",
      dataIndex: "tag",
      width: 200,
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (value: string, record: TagGroup) => {
        const onChange = (selectedValue) => handleChange(record.tag, selectedValue);

        return <Select value={value} style={{ width: 200 }} onChange={onChange} options={categoryOptions} />;
      },
    },
    {
      title: "",
      dataIndex: "tag",
      render: (value) => {
        const onClick = () => remove(value);

        return (
          <Popconfirm title="Sure to delete?" onConfirm={onClick}>
            <Button danger>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];

  const renderHeader = React.useCallback(() => <Header onAdd={onAdd} />, [onAdd]);

  return <Table columns={columns} dataSource={data} bordered title={renderHeader} size="small" pagination={false} />;
};

export default GroupTable;
