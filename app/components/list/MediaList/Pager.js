// @flow
import * as React from "react";
import { Pagination } from "antd";

import AppContext from "~/contexts/AppContext";
import useSettingValue from "~/components/hooks/useSettingValue";

type Props = {
  totalCount: number
};

const pageSizeOptions = ["2", "10", "20", "50"];

const keyMap = {
  MOVE_NEXT_PAGE: "right",
  MOVE_PREV_PAGE: "left",
};

const Pager = ({ totalCount }: Props) => {
  const { mode, changeHotKeys } = React.useContext(AppContext);
  const [pager, setPage] = useSettingValue("pager");

  const handleChange = (current, size) => {
    setPage({ current, size });
  };

  const movePage = offset => {
    setPage({ ...pager, current: pager.current + offset });
  };

  React.useEffect(
    () => {
      if (mode !== "list") return;

      const handlers = {
        MOVE_NEXT_PAGE: () => {
          const maxPage = Math.ceil(totalCount / pager.size);
          if (pager.current < maxPage) movePage(1);
        },
        MOVE_PREV_PAGE: () => {
          if (pager.current > 1) movePage(-1);
        },
      };

      changeHotKeys({ keyMap, handlers });
    },
    [mode, totalCount, pager]
  );

  return (
    <Pagination
      size="small"
      total={totalCount}
      current={pager.current}
      pageSize={pager.size}
      pageSizeOptions={pageSizeOptions}
      showSizeChanger
      showTotal={(total, range) => `${range[0]} - ${range[1]} / ${total} items`}
      onChange={handleChange}
      onShowSizeChange={handleChange}
    />
  );
};

export default Pager;
