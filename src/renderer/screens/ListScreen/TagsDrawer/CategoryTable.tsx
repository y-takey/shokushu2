import * as React from "react";
import { Button, Popconfirm, Table, TableColumnsType } from "antd";

import { useTagCategories } from "~/renderer/contexts/TagCategoriesContext";

import Header from "./Header";

const CategoryTable: React.FC = () => {
  const { categories, add, remove } = useTagCategories();
  const data = React.useMemo(() => categories.map((name) => ({ key: name, name })), [categories]);

  const columns: TableColumnsType = [
    {
      title: "Category",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "",
      dataIndex: "name",
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

  const renderHeader = React.useCallback(() => <Header onAdd={add} />, [add]);

  return <Table columns={columns} dataSource={data} bordered title={renderHeader} size="small" pagination={false} />;
};

export default CategoryTable;
