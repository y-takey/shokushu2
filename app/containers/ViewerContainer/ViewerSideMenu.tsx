import * as React from "react";
import { EditOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

import MediumContext from "~/contexts/MediumContext";

const SideMenu = () => {
  const { edit, openFolder } = React.useContext(MediumContext);

  const handleClick = ({ key }) => {
    if (key === "edit") edit();
    if (key === "open") openFolder();
  };

  return (
    <Layout.Sider trigger={null} collapsedWidth={40} collapsible collapsed>
      <Menu theme="dark" mode="inline" selectable={false} onClick={handleClick}>
        <Menu.Item key="edit">
          <EditOutlined />
          <span>Edit</span>
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
