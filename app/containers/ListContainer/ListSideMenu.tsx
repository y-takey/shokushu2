import * as React from "react";
import {
  FileJpgOutlined,
  SearchOutlined,
  SettingOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import ListContext from "~/contexts/ListContext";

const style = {
  minHeight: "100vh",
};

const SideMenu = () => {
  const {
    showSearchForm,
    showVideoForm,
    showComicForm,
    showSettingForm,
  } = React.useContext(ListContext);

  const handleClick = ({ key }) => {
    if (key === "search") showSearchForm();
    if (key === "video") showVideoForm();
    if (key === "comic") showComicForm();
    if (key === "setting") showSettingForm();
  };

  return (
    <Layout.Sider
      trigger={null}
      collapsedWidth={40}
      collapsible
      collapsed
      style={style}
    >
      <Menu theme="dark" mode="inline" selectable={false} onClick={handleClick}>
        <Menu.Item key="search">
          <SearchOutlined />
          <span>Search</span>
        </Menu.Item>
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
