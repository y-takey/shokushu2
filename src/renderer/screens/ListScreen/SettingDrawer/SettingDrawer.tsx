import * as React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, InputNumber, Form } from "antd";
import InputGroup from "antd/lib/input/Group";

import DirSelect from "~/renderer/components/DirSelect";
import DrawerFooter from "~/renderer/components/drawer/DrawerFooter";
import useDrawer from "~/renderer/components/drawer/useDrawer";
import useInput from "~/renderer/components/hooks/useInput";
import AppContext from "~/renderer/contexts/AppContext";

type Props = {
  onClose: (event: any) => void;
};

const formItemLayout = {
  labelCol: {
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    sm: {
      span: 16,
    },
  },
};

const SettingForm = ({ onClose }: Props) => {
  const { autoFullscreen: persistedAutoFullscreen, movingStep, comicDir, videoDir } = React.useContext(AppContext);
  const [filename, setFilename] = React.useState("");
  const [autoFullscreen, setAutoFullscreen] = React.useState(persistedAutoFullscreen);
  const [videoStepProps] = useInput(movingStep.video);
  const [comicStepProps] = useInput(movingStep.comic);
  const [comicDirProps] = useInput(comicDir);
  const [videoDirProps] = useInput(videoDir);

  React.useEffect(() => {
    const getFilename = async () => {
      setFilename(await window.shokushu2API.filename());
    };
    getFilename();
  }, []);

  const handleChangeAutoFullscreen = (event) => {
    setAutoFullscreen(event.target.checked);
  };

  const handleSave = () => {
    onClose({
      autoFullscreen,
      movingStep: {
        video: videoStepProps.value,
        comic: comicStepProps.value,
      },
      comicDir: comicDirProps.value,
      videoDir: videoDirProps.value,
    });
  };

  return (
    <Form layout="horizontal">
      <Form.Item label="Date file path" {...formItemLayout}>
        <span>{filename}</span>
      </Form.Item>
      <Form.Item label="Auto full screen" {...formItemLayout}>
        <Checkbox checked={autoFullscreen} onChange={handleChangeAutoFullscreen} />
      </Form.Item>

      <Form.Item label="Comics Directory" {...formItemLayout}>
        <DirSelect {...comicDirProps} />
      </Form.Item>
      <Form.Item label="Videos Directory" {...formItemLayout}>
        <DirSelect {...videoDirProps} />
      </Form.Item>

      <Form.Item label="Moving step (comic)" {...formItemLayout}>
        <InputGroup compact>
          <InputNumber style={{ width: 70 }} min={1} max={2} {...comicStepProps} />
          <Input style={{ width: 60 }} defaultValue="page" disabled />
        </InputGroup>
      </Form.Item>
      <Form.Item label="Moving step (video)" {...formItemLayout}>
        <InputGroup compact>
          <InputNumber style={{ width: 70 }} min={1} {...videoStepProps} />
          <Input style={{ width: 60 }} defaultValue="sec" disabled />
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
  width: 600,
});

export default SettingDrawer;
