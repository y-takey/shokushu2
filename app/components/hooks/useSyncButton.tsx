import * as React from "react";
import { SyncOutlined } from "@ant-design/icons";
import { Button } from "antd";

import MediaContext from "~/contexts/MediaContext";

const useSyncButton = (mediaType: "video" | "comic"): React.ReactNode => {
  const [loading, setLoading] = React.useState(false);
  const { sync } = React.useContext(MediaContext);

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
