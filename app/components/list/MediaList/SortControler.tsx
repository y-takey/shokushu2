import { startCase } from "lodash";
import * as React from "react";
import { Select } from "antd";

import useSettingValue from "~/components/hooks/useSettingValue";
import { Sorter } from "~/types";

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
    {items.map(item => (
      <Option key={item} value={item}>
        {startCase(item)}
      </Option>
    ))}
  </Select>
);

const SortControler = () => {
  const [sorter, setSorter] = useSettingValue<Sorter>("sorter");

  const handleChangeKey = key => {
    setSorter({ ...sorter, key });
  };

  const handleChangeValue = value => {
    setSorter({
      ...sorter,
      value,
    });
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
      <Selector
        value={sorter.value}
        width={70}
        margin={16}
        onChange={handleChangeValue}
        items={["asc", "desc"]}
      />
    </>
  );
};

export default SortControler;
