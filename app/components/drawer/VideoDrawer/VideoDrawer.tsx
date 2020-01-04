import * as React from "react";
import { Form, Button } from "antd";

import IconText from "~/components/text/IconText";
import useDrawer from "~/components/drawer/useDrawer";
import DrawerFooter from "~/components/drawer/DrawerFooter";

import useDirSelect from "~/components/hooks/useDirSelect";
import useSyncButton from "~/components/hooks/useSyncButton";
import useUploader from "~/components/hooks/useUploader";

type Props = {
  onClose: (event: any) => void;
};

const VideosForm = ({ onClose }: Props) => {
  const dirSelector = useDirSelect("videoDir");
  const syncButton = useSyncButton("video");
  const uploader = useUploader("video");
  const dirHeader = <IconText icon="folder" text="Root Directory" />;

  return (
    <Form layout="vertical">
      <Form.Item label={dirHeader}>{dirSelector}</Form.Item>
      <Form.Item>{syncButton}</Form.Item>
      <Form.Item>{uploader}</Form.Item>

      <DrawerFooter>
        {[
          <Button
            type="primary"
            icon="close"
            ghost
            onClick={onClose}
            key="close"
          >
            Close
          </Button>,
        ]}
      </DrawerFooter>
    </Form>
  );
};

const VideosDrawer = useDrawer(VideosForm, {
  title: "Videos Setting",
  icon: "video-camera",
  placement: "left",
});

export default VideosDrawer;