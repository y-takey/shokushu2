// @flow
import * as React from "react";
import { Form, Button } from "antd";

import IconText from "~/components/text/IconText";
import useDrawer from "~/components/drawer/useDrawer";

import useDirSelect from "~/components/hooks/useDirSelect";
import useSyncButton from "~/components/hooks/useSyncButton";

type Props = {
  onClose: Function
};

const VideosForm = ({ onClose }: Props) => {
  const dirSelector = useDirSelect("videoDir");
  const syncButton = useSyncButton("video");
  const dirHeader = <IconText icon="folder" text="Root Directory" />;

  return (
    <Form layout="vertical">
      <Form.Item label={dirHeader}>{dirSelector}</Form.Item>
      <Form.Item>{syncButton}</Form.Item>

      <Form.Item>
        <Button type="primary" ghost block onClick={onClose}>
          Close
        </Button>
      </Form.Item>
    </Form>
  );
};

const VideosDrawer = useDrawer(VideosForm, {
  title: "Videos Setting",
  icon: "video-camera",
  placement: "left",
});

export default VideosDrawer;
