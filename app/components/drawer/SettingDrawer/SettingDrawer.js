// @flow
import * as React from "react";
import { Form, Input, Button, Upload } from "antd";

import IconText from "~/components/text/IconText";
import useDrawer from "~/components/drawer/useDrawer";

type Props = {
  onClose: Function
};

const InputGroup = Input.Group;

const useDirSelect = initialValue => {
  const [value, change] = React.useState(initialValue);
  const beforeUpload = dir => {
    change(dir.path);
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
  const videoDirSelector = useDirSelect("");
  const comicDirSelector = useDirSelect("");

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
  placement: "left"
});

export default SettingDrawer;
