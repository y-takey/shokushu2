// @flow
import * as React from "react";
import { Form, Button, Alert, Checkbox, InputNumber } from "antd";

import { filename } from "~/datastore/db";
import DrawerFooter from "~/components/drawer/DrawerFooter";
import useDrawer from "~/components/drawer/useDrawer";

type Props = {
  onClose: Function
};

const formItemLayout = {
  labelCol: {
    sm: { span: 12 },
  },
  wrapperCol: {
    sm: { span: 12 },
  },
};

const SettingForm = ({ onClose }: Props) => (
  <Form layout="horizontal">
    <Form.Item>
      <Alert message="NOT Implemented yet" type="warning" />
    </Form.Item>
    <Form.Item label="Date file path" {...formItemLayout}>
      {filename}
    </Form.Item>
    <Form.Item label="Auto full screen" {...formItemLayout}>
      <Checkbox defaultChecked />
    </Form.Item>
    <Form.Item label="Moving step (video)" {...formItemLayout}>
      <InputNumber
        defaultValue={10}
        min={1}
        formatter={value => `${value}sec`}
        parser={value => value.replace("sec", "")}
      />
    </Form.Item>
    <Form.Item label="Moving step (comic)" {...formItemLayout}>
      <InputNumber
        defaultValue={1}
        min={1}
        max={2}
        formatter={value => `${value}page`}
        parser={value => value.replace("page", "")}
      />
    </Form.Item>
    <DrawerFooter>
      {[
        <Button icon="close" onClick={onClose} key="cancel">
          Cancel
        </Button>,
        <Button onClick={onClose} icon="check" type="primary" key="save">
          Save
        </Button>,
      ]}
    </DrawerFooter>
  </Form>
);

const SettingDrawer = useDrawer(SettingForm, {
  title: "Setting",
  icon: "setting",
  placement: "left",
});

export default SettingDrawer;
