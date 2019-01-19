// @flow
import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import styled from '@emotion/styled';

import Content from './Content';

// const { Header, Sider, Content } = Layout;
const FullLayout = styled(Layout)`
  min-height: 100vh;
`;

const App = () => {
  const handleClick = ({ item, key }) => console.log('menu click: ', item, key);

  return (
    <FullLayout>
      <Layout.Sider trigger={null} collapsible collapsed>
        <Menu
          theme="dark"
          mode="vertical"
          selectable={false}
          onClick={handleClick}
        >
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
      <Layout>
        <Content />
      </Layout>
    </FullLayout>
  );
};

export default App;
