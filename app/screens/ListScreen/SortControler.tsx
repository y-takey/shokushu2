import { startCase } from "lodash";
import * as React from "react";
import { Select } from "antd";

import ListContext from "./ListContext";

const { Option } = Select;

const Selector = ({ items, width, margin, ...selectProps }) => (
  <Select
    size="small"
    style={{
      width,
      marginRight: margin,
    }}
    {...selectProps}
  >
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

  return (
    <>
      <Selector
        value={sorter.key}
        width={130}
        margin={8}
        onChange={handleChangeKey}
        items={["registeredAt", "viewedAt", "viewedCount", "title", "fav"]}
      />
      <Selector value={sorter.value} width={80} margin={16} onChange={handleChangeValue} items={["asc", "desc"]} />
    </>
  );
};

export default SortControler;
