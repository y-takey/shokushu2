import * as React from "react";
import { Input } from "antd";

type Props = {
  onAdd: (value: string) => void;
};

const Header: React.FC<Props> = ({ onAdd }) => {
  const [value, setValue] = React.useState<string>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSearch = () => {
    const name = value?.trim() || "";
    if (name.length < 1) return;

    onAdd(name);
    setValue("");
  };

  return (
    <Input.Search
      allowClear
      style={{ width: 200 }}
      value={value}
      onChange={onChange}
      enterButton="Add"
      onSearch={onSearch}
    />
  );
};

export default Header;
