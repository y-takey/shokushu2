import * as React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  FlagOutlined,
  FlagFilled,
  HeartOutlined,
  HeartFilled,
  FolderOpenOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Popconfirm, Button, Tooltip } from "antd";

import MediumContext from "~/renderer/contexts/MediumContext";
import ListContext from "../ListContext";

type Props = unknown;

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
  const { isSelected, itemEvent, setItemEvent } = React.useContext(ListContext);
  const {
    _id: mediumId,
    isTodo,
    isStarred,
    edit,
    toggleTodo,
    toggleStarred,
    openFolder,
    remove,
    loadComic,
    toggleChapters,
  } = React.useContext(MediumContext);

  const handleChapter = () => {
    loadComic();
    toggleChapters();
  };

  React.useEffect(() => {
    if (!isSelected(mediumId) || !itemEvent) return;

    switch (itemEvent) {
      case "edit":
        edit();
        break;
      case "todo":
        toggleTodo();
        break;
      case "star":
        toggleStarred();
        break;
      case "chapter":
        handleChapter();
        break;
      case "open":
        openFolder();
        break;
      default:
        break;
    }
    setItemEvent(null);
  }, [itemEvent]);

  return (
    <>
      <Button.Group style={{ marginRight: 16 }}>
        <PrimaryButton icon={<EditOutlined />} tooltip="Edit" onClick={edit} />
        <PrimaryButton icon={isTodo ? <FlagFilled /> : <FlagOutlined />} tooltip="TODO" onClick={toggleTodo} />
        <PrimaryButton icon={isStarred ? <HeartFilled /> : <HeartOutlined />} tooltip="Star" onClick={toggleStarred} />
        <PrimaryButton icon={<ReadOutlined />} tooltip="Chapters" onClick={handleChapter} />
        <PrimaryButton icon={<FolderOpenOutlined />} tooltip="Open" onClick={openFolder} />
      </Button.Group>
      <Button.Group>
        <Popconfirm
          title="Are you sure delete this media?"
          placement="left"
          onConfirm={remove}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" icon={<DeleteOutlined />} size="small" style={{ marginRight: 12 }} danger />
        </Popconfirm>
      </Button.Group>
    </>
  );
};

export default ActionButtons;
