import * as React from "react";
import {
  FileJpgOutlined,
  FlagFilled,
  FlagOutlined,
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
  SearchOutlined,
  SettingOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import AppContext from "~/contexts/AppContext";
import ListContext from "~/contexts/ListContext";

const style = {
  minHeight: "100vh",
};

const SideMenu = () => {
  const {
    condition: { isStarred, isTodo },
  } = React.useContext(AppContext);
  const {
    filterClear,
    filterTodo,
    filterStarred,
    showSearchForm,
    showVideoForm,
    showComicForm,
    showSettingForm,
  } = React.useContext(ListContext);

  const handleClick = ({ key }) => {
    if (key === "home") filterClear();
    if (key === "todo") filterTodo();
    if (key === "star") filterStarred();
    if (key === "search") showSearchForm();
    if (key === "video") showVideoForm();
    if (key === "comic") showComicForm();
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
        <Menu.Item key="video">
          <VideoCameraOutlined />
          <span>Video</span>
        </Menu.Item>
        <Menu.Item key="comic">
          <FileJpgOutlined />
          <span>Comic</span>
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
