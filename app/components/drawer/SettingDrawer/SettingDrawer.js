// @flow
import * as React from "react";
import { Form, Input, Button, Upload } from "antd";
import InputGroup from "antd/lib/input/Group";

import IconText from "~/components/text/IconText";
import useDrawer from "~/components/drawer/useDrawer";
import SettingContext from "~/contexts/SettingContext";

type Props = {
  onClose: Function
};

const useDirSelect = fieldName => {
  const setting = React.useContext(SettingContext);
  const [value, change] = React.useState(setting[fieldName]);
  const beforeUpload = dir => {
    change(dir.path);
    setting.update({ [fieldName]: dir.path });
    return false;
  };

  return (
    <InputGroup compact>
      <Input value={value} readOnly style={{ width: "calc(100% - 100px)" }} />
      <Upload directory beforeUpload={beforeUpload} showUploadList={false}>
        <Button type="primary">
          <IconText icon="folder-open" text="Select" />
        </Button>
      </Upload>
    </InputGroup>
  );
};

const SettingForm = ({ onClose }: Props) => {
  const videoDirSelector = useDirSelect("videoDir");
  const comicDirSelector = useDirSelect("comicDir");

  return (
    <Form layout="vertical">
      <Form.Item
        label={<IconText icon="video-camera" text="Video's root directory" />}
      >
        {videoDirSelector}
      </Form.Item>
      <Form.Item
        label={<IconText icon="file-jpg" text="Comic's root directory" />}
      >
        {comicDirSelector}
      </Form.Item>
      <Form.Item>
        <Button type="primary" ghost onClick={onClose}>
          Close
        </Button>
      </Form.Item>
    </Form>
  );
};

const SettingDrawer = useDrawer(SettingForm, {
  title: "Setting",
  icon: "setting",
  placement: "left",
});

export default SettingDrawer;
