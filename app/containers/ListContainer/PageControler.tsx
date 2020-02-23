import * as React from "react";
import { Pagination } from "antd";

import ListContext from "~/contexts/ListContext";

type Props = {};

const pageSizeOptions = ["2", "10", "20", "50"];

const PageControler: React.FC<Props> = () => {
  const { totalCount, pager, changePager } = React.useContext(ListContext);

  const handleChange = (current, size) => {
    changePager({ current, size });
  };

  return (
    <div>
      <Pagination
        size="small"
        total={totalCount}
        current={pager.current}
        pageSize={pager.size}
        pageSizeOptions={pageSizeOptions}
        showSizeChanger
        showTotal={(total, range) =>
          `${range[0]} - ${range[1]} / ${total} items`
        }
        onChange={handleChange}
        onShowSizeChange={handleChange}
      />
    </div>
  );
};

export default PageControler;