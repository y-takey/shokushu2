import * as React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

import MediaContext from '~/contexts/MediaContext';

const useUploader = (mediaType: 'comic' | 'video') => {
  const baseDirectory = mediaType === 'comic';
  const { add } = React.useContext(MediaContext);
  const [dir, setDir] = React.useState(baseDirectory);

  const beforeUpload = file => {
    add(mediaType, file.path);
    return false;
  };

  const handleDragEnter = () => setDir(!baseDirectory);

  const handleMouseEnter = () => setDir(baseDirectory);

  return (
    <Upload.Dragger
      directory={dir}
      beforeUpload={beforeUpload}
      showUploadList={false}
      multiple={false}
    >
      <div
        role="presentation"
        style={{
          padding: '3em',
        }}
        onDragEnter={handleDragEnter}
        onMouseEnter={handleMouseEnter}
      >
        <InboxOutlined
          style={{
            fontSize: 40,
          }} />
        <p>Click or drag file to this area to upload</p>
      </div>
    </Upload.Dragger>
  );
};

export default useUploader;
