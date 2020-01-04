import * as React from "react";
import { Form, Button } from "antd";

import IconText from "~/components/text/IconText";
import useDrawer from "~/components/drawer/useDrawer";
import DrawerFooter from "~/components/drawer/DrawerFooter";

import useDirSelect from "~/components/hooks/useDirSelect";
import useSyncButton from "~/components/hooks/useSyncButton";
import useUploader from "~/components/hooks/useUploader";

interface Props {
  onClose: (event: any) => void;
}

const ComicsForm: React.FC<Props> = ({ onClose }) => {
  const dirSelector = useDirSelect("comicDir");
  const syncButton = useSyncButton("comic");
  const uploader = useUploader("comic");
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

const ComicsDrawer = useDrawer(ComicsForm, {
  title: "Comics Setting",
  icon: "file-jpg",
  placement: "left",
});

export default ComicsDrawer;
