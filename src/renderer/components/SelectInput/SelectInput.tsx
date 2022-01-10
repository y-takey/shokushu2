import React, { ComponentProps } from "react";
import { Select } from "antd";

type Props = ComponentProps<typeof Select> & {
  items: Array<string>;
  mode?: "multiple" | "tags";
};

const { Option } = Select;

const SelectInput: React.FC<Props> = ({ items, mode, ...otherProps }) => (
  <Select
    mode={mode}
    style={{
      width: "100%",
    }}
    {...otherProps}
  >
    {items.map((item) => (
      <Option value={item} key={item}>
        {item}
      </Option>
    ))}
  </Select>
);

SelectInput.defaultProps = {
  mode: "tags",
};

export default SelectInput;
