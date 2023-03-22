import * as React from "react";
import {
  FlagFilled,
  FlagOutlined,
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
  SyncOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";

import ListContext from "./ListContext";

type Props = unknown;

const style = {
  minHeight: "100vh",
};

const SideMenu: React.FC<Props> = () => {
  const {
    condition: { isStarred, isTodo },
    filterClear,
    filterTodo,
    filterStarred,
    showSearchForm,
    showSettingForm,
    showTagsForm,
    syncAll,
  } = React.useContext(ListContext);

  const handleClick = ({ key }) => {
    if (key === "home") filterClear();
    if (key === "todo") filterTodo();
    if (key === "star") filterStarred();
    if (key === "search") showSearchForm();
    if (key === "sync") syncAll();
    if (key === "tag") showTagsForm();
    if (key === "setting") showSettingForm();
  };

  const menuItems: MenuProps["items"] = [
    { key: "home", icon: <HomeOutlined />, label: "Home" },
    { key: "todo", icon: isTodo ? <FlagFilled /> : <FlagOutlined />, label: "ToDo" },
    { key: "star", icon: isStarred ? <HeartFilled /> : <HeartOutlined />, label: "Star" },
    { key: "search", icon: <SearchOutlined />, label: "Search" },
    { type: "divider" },
    { key: "sync", icon: <SyncOutlined />, label: "Sync" },
    { key: "tag", icon: <TagsOutlined />, label: "Tag" },
    { key: "setting", icon: <SettingOutlined />, label: "Setting" },
  ];

  return (
    <Layout.Sider trigger={null} collapsedWidth={40} collapsible collapsed style={style}>
      <Menu theme="dark" mode="inline" selectable={false} onClick={handleClick} items={menuItems} />
    </Layout.Sider>
  );
};

export default SideMenu;
