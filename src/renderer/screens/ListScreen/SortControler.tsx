import { startCase } from "lodash";
import * as React from "react";
import { Select, SelectProps, Button, Space } from "antd";

import ListContext from "./ListContext";

const { Option } = Select;

type Props = SelectProps & {
  items: string[];
  width: number;
};

const Selector: React.FC<Props> = ({ items, width, ...selectProps }) => (
  <Select size="small" style={{ width }} {...selectProps}>
    {items.map((item) => (
      <Option key={item} value={item}>
        {startCase(item)}
      </Option>
    ))}
  </Select>
);

const SortControler: React.FC = () => {
  const { sorter, changeSorter } = React.useContext(ListContext);

  const handleChangeKey = (key) => {
    changeSorter({ ...sorter, key });
  };

  const handleChangeValue = (value) => {
    changeSorter({ ...sorter, value });
  };

  const handleRecentlyAdded = () => {
    changeSorter({ key: "registeredAt", value: "desc" });
  };

  const handleRecentlyViewed = () => {
    changeSorter({ key: "viewedAt", value: "desc" });
  };

  return (
    <Space>
      <Selector
        value={sorter.key}
        width={130}
        onChange={handleChangeKey}
        items={["registeredAt", "viewedAt", "viewedCount", "title", "fav"]}
      />
      <Selector value={sorter.value} width={80} onChange={handleChangeValue} items={["asc", "desc"]} />
      <Button type="primary" size="small" ghost onClick={handleRecentlyAdded}>
        Recently Added
      </Button>
      <Button type="primary" size="small" ghost onClick={handleRecentlyViewed}>
        Recently Viewed
      </Button>
    </Space>
  );
};

export default SortControler;
