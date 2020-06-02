import * as React from "react";
import { SyncOutlined } from "@ant-design/icons";
import { Button } from "antd";

import ListContext from "~/containers/ListContainer/ListContext";

const useSyncButton = (mediaType: "video" | "comic"): React.ReactNode => {
  const [loading, setLoading] = React.useState(false);
  const { sync } = React.useContext(ListContext);

  const handleSync = async () => {
    setLoading(true);
    await sync(mediaType);
    setLoading(false);
  };

  return (
    <Button type="primary" icon={<SyncOutlined />} block loading={loading} onClick={handleSync}>
      Sync
    </Button>
  );
};

export default useSyncButton;
