import * as React from 'react';
import { FolderOpenOutlined } from '@ant-design/icons';
import { Input, Button, Upload } from 'antd';
import InputGroup from 'antd/lib/input/Group';

import IconText from '~/components/text/IconText';
import AppContext from '~/contexts/AppContext';

const useDirSelect = (fieldName: 'videoDir' | 'comicDir') => {
  const { [fieldName]: value, update } = React.useContext(AppContext);

  const beforeUpload = dir => {
    update({
      [fieldName]: dir.path,
    });
    return false;
  };

  return (
    <InputGroup compact>
      <Input
        value={value}
        readOnly
        style={{
          width: 'calc(100% - 100px)',
        }}
      />
      <Upload directory beforeUpload={beforeUpload} showUploadList={false}>
        <Button type="primary">
          <IconText icon={<FolderOpenOutlined />} text="Select" />
        </Button>
      </Upload>
    </InputGroup>
  );
};

export default useDirSelect;
