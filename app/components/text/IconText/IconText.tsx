import * as React from "react";
import {
  AppstoreOutlined,
  CaretRightOutlined,
  DatabaseOutlined,
  EyeOutlined,
  EditOutlined,
  FileJpgOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  PlusOutlined,
  ReadOutlined,
  SearchOutlined,
  SettingOutlined,
  SolutionOutlined,
  StarOutlined,
  TagOutlined,
  TagsOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

type Props = {
  icon: string;
  text: any;
};

const getIcon = (type: string) => {
  if (type === "appstore") return <AppstoreOutlined />;
  if (type === "caret-right") return <CaretRightOutlined />;
  if (type === "database") return <DatabaseOutlined />;
  if (type === "eye") return <EyeOutlined />;
  if (type === "edit") return <EditOutlined />;
  if (type === "file-jpg") return <FileJpgOutlined />;
  if (type === "folder") return <FolderOutlined />;
  if (type === "folder-open") return <FolderOpenOutlined />;
  if (type === "plus") return <PlusOutlined />;
  if (type === "read") return <ReadOutlined />;
  if (type === "search") return <SearchOutlined />;
  if (type === "setting") return <SettingOutlined />;
  if (type === "solution") return <SolutionOutlined />;
  if (type === "star") return <StarOutlined />;
  if (type === "tag") return <TagOutlined />;
  if (type === "tags") return <TagsOutlined />;
  if (type === "video-camera") return <VideoCameraOutlined />;

  return "?";
};

const IconText = ({ icon, text }: Props) => (
  <span>
    {getIcon(icon)}
    <span style={{ marginLeft: 8 }}>{text}</span>
  </span>
);

export default IconText;
