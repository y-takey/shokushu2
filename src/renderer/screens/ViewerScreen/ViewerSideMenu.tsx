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
import { Layout, Menu } from "antd";

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

  return (
    <Layout.Sider trigger={null} collapsedWidth={40} collapsible collapsed>
      <Menu theme="dark" mode="inline" selectable={false} onClick={handleClick}>
        <Menu.Item key="chapters">
          <ReadOutlined />
          <span>Chapters</span>
        </Menu.Item>
        <Menu.Item key="edit">
          <EditOutlined />
          <span>Edit</span>
        </Menu.Item>
        <Menu.Item key="todo">
          {isTodo ? <FlagFilled /> : <FlagOutlined />}
          <span>TODO</span>
        </Menu.Item>
        <Menu.Item key="star">
          {isStarred ? <HeartFilled /> : <HeartOutlined />}
          <span>Star</span>
        </Menu.Item>
        <Menu.Item key="open">
          <FolderOpenOutlined />
          <span>Open</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SideMenu;
