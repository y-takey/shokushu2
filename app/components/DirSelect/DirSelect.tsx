import * as React from "react";
import { Input, Button } from "antd";
import InputGroup from "antd/lib/input/Group";

import IconText from "~/components/IconText";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const inputStyle = {
  width: "calc(100% - 100px)",
};

const DirSelect: React.FC<Props> = ({ value, onChange }) => {
  const { dialog } = window as any;

  const handleClick = () => {
    const dir = dialog.showOpenDialogSync({ properties: ["openDirectory"] });

    if (dir) onChange(dir[0]);
  };

  return (
    <InputGroup compact>
      <Input value={value} readOnly style={inputStyle} />
      <Button type="primary" onClick={handleClick}>
        <IconText icon="folder-open" text="Select" />
      </Button>
    </InputGroup>
  );
};

export default DirSelect;
