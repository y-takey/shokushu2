// @flow
import * as React from "react";
import { Drawer } from "antd";

import IconText from "~/components/text/IconText";
import MediaViewer from "~/components/viewer/MediaViewer";
import AppContext from "~/contexts/AppContext";

import records from "~/components/list/MediaList/mockData";

type Props = {
  visible: boolean
};

const MediaDrawer = (props: Props) => {
  const { changeMode, changeViewId } = React.useContext(AppContext);

  const handleClose = () => {
    changeMode("");
    changeViewId(null);
  };

  const { type, title } = records[0];
  const icon = type === "comic" ? "file-jpg" : "video-camera";

  return (
    <Drawer
      closable
      destroyOnClose
      onClose={handleClose}
      visible={props.visible}
      placement="right"
      width="100%"
      title={<IconText icon={icon} text={title} />}
    >
      <MediaViewer />
    </Drawer>
  );
};

export default MediaDrawer;
