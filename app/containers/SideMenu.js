// @flow
import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';

import AppContext from '~/contexts/AppContext';

const SideMenu = () => {
  const { update } = React.useContext(AppContext);
  const handleClick = ({ key }) => {
    update({ mode: key });
  };

  return (
    <Layout.Sider trigger={null} collapsedWidth={40} collapsible collapsed>
      <Menu theme="dark" mode="inline" selectable={false} onClick={handleClick}>
        <Menu.Item key="search">
          <Icon type="search" />
          <span>Search</span>
        </Menu.Item>
        <Menu.Item key="setting">
          <Icon type="setting" />
          <span>Setting</span>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default SideMenu;
