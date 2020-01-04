import * as React from 'react';
import { Drawer } from 'antd';

import IconText from '~/components/text/IconText';
import MediaViewer from '~/components/viewer/MediaViewer';
import AppContext from '~/contexts/AppContext';
import MediaContext from '~/contexts/MediaContext';
import { formatToday } from '~/utils/date';

type Props = {
  visible: boolean;
};

const MediaDrawer = (props: Props) => {
  const { update } = React.useContext(AppContext);
  const { currentMedia, update: updateMedia } = React.useContext(MediaContext);
  if (!currentMedia) return <></>;

  const { mediaType, title, currentPosition, viewedCount, size } = currentMedia;

  const handleClose = async () => {
    const progress = size ? currentPosition / size : 0;

    // when progress is over 99%, back to top
    if (progress > 0.99) {
      await updateMedia({
        viewedCount: viewedCount + 1,
        viewedAt: formatToday(),
        currentPosition: null,
      });
    }

    update({
      mode: 'list',
      selectedId: null,
    });
  };

  const icon = mediaType === 'comic' ? 'file-jpg' : 'video-camera';

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
