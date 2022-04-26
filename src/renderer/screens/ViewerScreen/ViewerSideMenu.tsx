import * as React from "react";
import {
  EditOutlined,
  FolderOpenOutlined,
  FlagOutlined,
  FlagFilled,
  HeartOutlined,
  HeartFilled,
  ReadOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";

import MediumContext from "~/renderer/contexts/MediumContext";

const SideMenu: React.FC = () => {
  const { isStarred, isTodo, edit, toggleChapters, toggleStarred, toggleTodo, openFolder } =
    React.useContext(MediumContext);

  const handleClick = ({ key }) => {
    if (key === "chapters") toggleChapters();
    if (key === "edit") edit();
    if (key === "todo") toggleTodo();
    if (key === "star") toggleStarred();
    if (key === "open") openFolder();
  };

  const menuItems: MenuProps["items"] = [
    { key: "chapters", icon: <ReadOutlined />, label: "Chapters" },
    { key: "edit", icon: <EditOutlined />, label: "Edit" },
    { key: "todo", icon: isTodo ? <FlagFilled /> : <FlagOutlined />, label: "ToDo" },
    { key: "star", icon: isStarred ? <HeartFilled /> : <HeartOutlined />, label: "Star" },
    { key: "open", icon: <FolderOpenOutlined />, label: "Open" },
  ];

  return (
    <Layout.Sider trigger={null} collapsedWidth={40} collapsible collapsed>
      <Menu theme="dark" mode="inline" selectable={false} onClick={handleClick} items={menuItems} />
    </Layout.Sider>
  );
};

export default SideMenu;
