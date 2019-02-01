// @flow
import * as React from "react";
import { Form, Button } from "antd";

import IconText from "~/components/text/IconText";
import useDrawer from "~/components/drawer/useDrawer";

import useDirSelect from "~/components/hooks/useDirSelect";
import useSyncButton from "~/components/hooks/useSyncButton";
import useUploader from "~/components/hooks/useUploader";

type Props = {
  onClose: Function
};

const ComicsForm = ({ onClose }: Props) => {
  const dirSelector = useDirSelect("comicDir");
  const syncButton = useSyncButton("comic");
  const uploader = useUploader("comic");
  const dirHeader = <IconText icon="folder" text="Root Directory" />;

  return (
    <Form layout="vertical">
      <Form.Item label={dirHeader}>{dirSelector}</Form.Item>
      <Form.Item>{syncButton}</Form.Item>
      <Form.Item>{uploader}</Form.Item>

      <Form.Item>
        <Button type="primary" ghost block onClick={onClose}>
          Close
        </Button>
      </Form.Item>
    </Form>
  );
};

const ComicsDrawer = useDrawer(ComicsForm, {
  title: "Comics Setting",
  icon: "file-jpg",
  placement: "left",
});

export default ComicsDrawer;
