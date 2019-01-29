// @flow
import * as React from "react";
import { Select } from "antd";

type Props = {
  items: Array<string>
};

const { Option } = Select;

const SelectInput = ({ items, ...otherProps }: Props) => (
  <Select mode="tags" style={{ width: "100%" }} {...otherProps}>
    {items.map(item => (
      <Option key={item}>{item}</Option>
    ))}
  </Select>
);

export default SelectInput;
