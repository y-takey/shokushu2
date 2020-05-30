import * as React from "react";
import { Input, Button } from "antd";
import InputGroup from "antd/lib/input/Group";

import IconText from "~/components/text/IconText";
import AppContext from "~/contexts/AppContext";

const useDirSelect = (fieldName: "videoDir" | "comicDir"): React.ReactNode => {
  const { [fieldName]: value, update } = React.useContext(AppContext);
  const { dialog } = window as any;

  const handleClick = () => {
    const dir = dialog.showOpenDialogSync({ properties: ["openDirectory"] });

    if (dir) update({ [fieldName]: dir[0] });
  };

  return (
    <InputGroup compact>
      <Input
        value={value}
        readOnly
        style={{
          width: "calc(100% - 100px)",
        }}
      />
      <Button type="primary" onClick={handleClick}>
        <IconText icon="folder-open" text="Select" />
      </Button>
    </InputGroup>
  );
};

export default useDirSelect;
