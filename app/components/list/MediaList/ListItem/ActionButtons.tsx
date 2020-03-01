import * as React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  FlagOutlined,
  FlagFilled,
  HeartOutlined,
  HeartFilled,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Popconfirm, Button, Tooltip } from "antd";

import MediumContext from "~/contexts/MediumContext";

type Props = {};

type PrimaryButtonProps = {
  icon: React.ReactNode;
  tooltip: string;
  onClick: () => void;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ icon, tooltip, onClick }) => (
  <Tooltip title={tooltip}>
    <Button type="primary" size="small" ghost style={{ width: "2.2rem" }} icon={icon} onClick={onClick} />
  </Tooltip>
);

const ActionButtons: React.FC<Props> = () => {
  const { isTodo, isStarred, edit, toggleTodo, toggleStarred, openFolder, remove } = React.useContext(MediumContext);

  return (
    <>
      <Button.Group style={{ marginRight: 16 }}>
        <PrimaryButton icon={<EditOutlined />} tooltip="Edit" onClick={edit} />
        <PrimaryButton icon={isTodo ? <FlagFilled /> : <FlagOutlined />} tooltip="TODO" onClick={toggleTodo} />
        <PrimaryButton icon={isStarred ? <HeartFilled /> : <HeartOutlined />} tooltip="Star" onClick={toggleStarred} />
        <PrimaryButton icon={<FolderOpenOutlined />} tooltip="Open" onClick={openFolder} />
      </Button.Group>
      <Popconfirm
        title="Are you sure delete this media?"
        placement="left"
        onConfirm={remove}
        okText="Yes"
        cancelText="No"
      >
        <Button type="danger" icon={<DeleteOutlined />} size="small" style={{ marginRight: 12 }} />
      </Popconfirm>
    </>
  );
};

export default ActionButtons;
