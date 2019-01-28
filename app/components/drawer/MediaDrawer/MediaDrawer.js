// @flow
import * as React from "react";
import { Drawer } from "antd";

import IconText from "~/components/text/IconText";
import MediaViewer from "~/components/viewer/MediaViewer";
import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";

type Props = {
  visible: boolean
};

const MediaDrawer = (props: Props) => {
  const { update } = React.useContext(AppContext);
  const { currentMedia } = React.useContext(MediaContext);
  if (!currentMedia) return <></>;

  const handleClose = () => {
    update({ mode: "list", selectedId: null });
  };

  const { mediaType, title } = currentMedia;
  const icon = mediaType === "comic" ? "file-jpg" : "video-camera";

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
