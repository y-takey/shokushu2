import * as React from 'react';
import { FileJpgOutlined, SearchOutlined, SettingOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import AppContext from '~/contexts/AppContext';

const SideMenu = () => {
  const { update } = React.useContext(AppContext);

  const handleClick = ({ key }) => {
    update({
      mode: key,
    });
  };

  return (
    <Layout.Sider trigger={null} collapsedWidth={40} collapsible collapsed>
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
