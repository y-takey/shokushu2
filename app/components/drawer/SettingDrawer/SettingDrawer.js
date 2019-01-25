// @flow
import * as React from "react";
import { Divider, Form, Input, Button, Upload } from "antd";
import InputGroup from "antd/lib/input/Group";

import IconText from "~/components/text/IconText";
import useDrawer from "~/components/drawer/useDrawer";
import SettingContext from "~/contexts/SettingContext";
import MediaContext from "~/contexts/MediaContext";

type Props = {
  onClose: Function
};

const useDirSelect = fieldName => {
  const setting = React.useContext(SettingContext);
  const value = setting[fieldName];
  const beforeUpload = dir => {
    setting.update(fieldName, dir.path);
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

const useSyncButton = mediaType => {
  const [loading, changeLoading] = React.useState(false);
  const { sync } = React.useContext(MediaContext);

  const handleSync = async () => {
    changeLoading(true);
    await sync(mediaType);
    changeLoading(false);
  };

  return (
    <Button
      type="primary"
      icon="sync"
      block
      loading={loading}
      onClick={handleSync}
    >
      Sync
    </Button>
  );
};

const SettingForm = ({ onClose }: Props) => {
  const videoDirSelector = useDirSelect("videoDir");
  const comicDirSelector = useDirSelect("comicDir");
  const videoSyncButton = useSyncButton("video");
  const comicSyncButton = useSyncButton("comic");
  const dirHeader = <IconText icon="folder" text="Root Directory" />;

  return (
    <Form layout="vertical">
      <Divider orientation="left">
        <IconText icon="video-camera" text="Videos" />
      </Divider>
      <Form.Item label={dirHeader}>{videoDirSelector}</Form.Item>
      <Form.Item>{videoSyncButton}</Form.Item>

      <Divider orientation="left">
        <IconText icon="file-jpg" text="Comics" />
      </Divider>
      <Form.Item label={dirHeader}>{comicDirSelector}</Form.Item>
      <Form.Item>{comicSyncButton}</Form.Item>

      <Divider dashed />
      <Form.Item>
        <Button type="primary" ghost block onClick={onClose}>
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
