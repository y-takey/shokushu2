// @flow
import * as React from "react";
import { Form, Button } from "antd";

import useDrawer from "~/components/drawer/useDrawer";

type Props = {
  onClose: Function
};

const SettingForm = ({ onClose }: Props) => (
  <Form layout="vertical">
    <Form.Item>
      <Button type="primary" ghost block onClick={onClose}>
        Close
      </Button>
    </Form.Item>
  </Form>
);

const SettingDrawer = useDrawer(SettingForm, {
  title: "Setting",
  icon: "setting",
  placement: "left",
});

export default SettingDrawer;
