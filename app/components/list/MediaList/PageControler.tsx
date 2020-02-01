import * as React from "react";
import { Pagination } from "antd";

import AppContext from "~/contexts/AppContext";
import useSettingValue from "~/components/hooks/useSettingValue";
import { Pager } from "~/types";

type Props = {
  totalCount: number;
};

const pageSizeOptions = ["2", "10", "20", "50"];

const keyMap = {
  MOVE_NEXT_PAGE: "right",
  MOVE_PREV_PAGE: "left",
  FIND: "f",
  VIDEO: "v",
  COMIC: "c",
  SETTING: "s",
};

const PageControler = ({ totalCount }: Props) => {
  const { mode, changeHotKeys, update } = React.useContext(AppContext);
  const [pager, setPage] = useSettingValue<Pager>("pager");

  const handleChange = (current, size) => {
    setPage({
      current,
      size,
    });
  };

  const movePage = offset => {
    setPage({
      ...pager,
      current: pager.current + offset,
    });
  };

  React.useEffect(() => {
    if (mode !== "list") return;

    const handlers = {
      MOVE_NEXT_PAGE: () => {
        const maxPage = Math.ceil(totalCount / pager.size);
        if (pager.current < maxPage) movePage(1);
      },
      MOVE_PREV_PAGE: () => {
        if (pager.current > 1) movePage(-1);
      },

      FIND: () => {
        update({ mode: "search" });
      },

      VIDEO: () => {
        update({ mode: "video" });
      },

      COMIC: () => {
        update({ mode: "comic" });
      },

      SETTING: () => {
        update({ mode: "setting" });
      },
    };

    changeHotKeys({ keyMap, handlers });
  }, [mode, totalCount, pager]);

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

export default PageControler;
