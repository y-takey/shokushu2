import * as React from "react";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input, InputNumber } from "antd";
import InputGroup from "antd/lib/input/Group";

import { filename } from "~/datastore/db";
import DrawerFooter from "~/components/drawer/DrawerFooter";
import useDrawer from "~/components/drawer/useDrawer";
import useInput from "~/components/hooks/useInput";
import AppContext from "~/contexts/AppContext";

type Props = {
  onClose: (event: any) => void;
};

const formItemLayout = {
  labelCol: {
    sm: {
      span: 12,
    },
  },
  wrapperCol: {
    sm: {
      span: 12,
    },
  },
};

const SettingForm = ({ onClose }: Props) => {
  const {
    autoFullscreen: persistedAutoFullscreen,
    movingStep,
  } = React.useContext(AppContext);
  const [autoFullscreen, setAutoFullscreen] = React.useState(
    persistedAutoFullscreen
  );
  const [videoStepProps] = useInput(movingStep.video);
  const [comicStepProps] = useInput(movingStep.comic);

  const handleChangeAutoFullscreen = event => {
    setAutoFullscreen(event.target.checked);
  };

  const handleSave = () => {
    onClose({
      autoFullscreen,
      movingStep: {
        video: videoStepProps.value,
        comic: comicStepProps.value,
      },
    });
  };

  return (
    <Form layout="horizontal">
      <Form.Item label="Date file path" {...formItemLayout}>
        {filename}
      </Form.Item>
      <Form.Item label="Auto full screen" {...formItemLayout}>
        <Checkbox
          checked={autoFullscreen}
          onChange={handleChangeAutoFullscreen}
        />
      </Form.Item>
      <Form.Item label="Moving step (video)" {...formItemLayout}>
        <InputGroup compact>
          <InputNumber
            style={{
              width: 70,
            }}
            min={1}
            {...videoStepProps}
          />
          <Input
            style={{
              width: 60,
            }}
            defaultValue="sec"
            disabled
          />
        </InputGroup>
      </Form.Item>
      <Form.Item label="Moving step (comic)" {...formItemLayout}>
        <InputGroup compact>
          <InputNumber
            style={{
              width: 70,
            }}
            min={1}
            max={2}
            {...comicStepProps}
          />
          <Input
            style={{
              width: 60,
            }}
            defaultValue="page"
            disabled
          />
        </InputGroup>
      </Form.Item>
      <DrawerFooter>
        {[
          <Button icon={<CloseOutlined />} onClick={onClose} key="cancel">
            Cancel
          </Button>,
          <Button onClick={handleSave} icon={<CheckOutlined />} type="primary" key="save">
            Save
          </Button>,
        ]}
      </DrawerFooter>
    </Form>
  );
};

const SettingDrawer = useDrawer(SettingForm, {
  title: "Setting",
  icon: "setting",
  placement: "left",
});

export default SettingDrawer;
