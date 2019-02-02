// @flow
import * as React from "react";
import { Select } from "antd";

type Props = {
  items: Array<string>,
  mode?: "multiple" | "tags"
};

const { Option } = Select;

const SelectInput = ({ items, mode, ...otherProps }: Props) => (
  <Select mode={mode} style={{ width: "100%" }} {...otherProps}>
    {items.map(item => (
      <Option key={item}>{item}</Option>
    ))}
  </Select>
);

SelectInput.defaultProps = {
  mode: "tags",
};

export default SelectInput;
