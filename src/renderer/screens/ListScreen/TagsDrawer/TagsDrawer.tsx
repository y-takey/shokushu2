import { CloseOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

import DrawerFooter from "~/renderer/components/drawer/DrawerFooter";
import useDrawer from "~/renderer/components/drawer/useDrawer";

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

const TagsDrawer = useDrawer(TagsForm, {
  title: "Tags",
  icon: "tags",
  placement: "left",
  width: 600,
});

export default TagsDrawer;
