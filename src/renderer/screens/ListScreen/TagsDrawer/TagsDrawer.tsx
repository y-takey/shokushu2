import { CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

import DrawerFooter from "~/renderer/components/drawer/DrawerFooter";
import createDrawer from "~/renderer/components/drawer/createDrawer";

import CategoryTable from "./CategoryTable";
import GroupTable from "./GroupTable";

type Props = {
  onClose: (event: any) => void;
};

const TagsForm = ({ onClose }: Props) => (
  <div>
    <Space direction="vertical" size="middle" style={{ width: "100%", paddingBottom: 40 }}>
      <CategoryTable />
      <GroupTable />
    </Space>
    <DrawerFooter>
      {[
        <Button icon={<CloseOutlined />} onClick={onClose} key="cancel">
          Close
        </Button>,
      ]}
    </DrawerFooter>
  </div>
);

const TagsDrawer = createDrawer(TagsForm, {
  title: "Tags",
  icon: "tags",
  placement: "left",
  size: 600,
});

export default TagsDrawer;
