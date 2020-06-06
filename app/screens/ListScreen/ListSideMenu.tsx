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
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

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
    syncAll,
  } = React.useContext(ListContext);

  const handleClick = ({ key }) => {
    if (key === "home") filterClear();
    if (key === "todo") filterTodo();
    if (key === "star") filterStarred();
    if (key === "search") showSearchForm();
    if (key === "sync") syncAll();
    if (key === "setting") showSettingForm();
  };

  return (
    <Layout.Sider trigger={null} collapsedWidth={40} collapsible collapsed style={style}>
      <Menu theme="dark" mode="inline" selectable={false} onClick={handleClick}>
        <Menu.Item key="home">
          <HomeOutlined />
          <span>Home</span>
        </Menu.Item>
        <Menu.Item key="todo">
          {isTodo ? <FlagFilled /> : <FlagOutlined />}
          <span>TODO</span>
        </Menu.Item>
        <Menu.Item key="star">
          {isStarred ? <HeartFilled /> : <HeartOutlined />}
          <span>Star</span>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchOutlined />
          <span>Search</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="sync">
          <SyncOutlined />
          <span>Sync</span>
        </Menu.Item>
        <Menu.Item key="setting">
          <SettingOutlined />
          <span>Setting</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SideMenu;
