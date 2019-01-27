// @flow
import * as React from "react";
import { List } from "antd";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";

import ListItem from "./ListItem";

const MediaList = () => {
  const { mode, changeHotKeys } = React.useContext(AppContext);
  const { media } = React.useContext(MediaContext);

  React.useEffect(
    () => {
      if (mode === "list") {
        const keyMap = {
          MOVE_NEXT_PAGE: "right",
          MOVE_PREV_PAGE: "left",
        };

        const handlers = {
          MOVE_NEXT_PAGE: () => {
            console.log("[TODO] implement pager");
          },
          MOVE_PREV_PAGE: () => {
            console.log("[TODO] implement pager");
          },
        };

        changeHotKeys({ keyMap, handlers });
      }
    },
    [mode]
  );

  return (
    <List
      itemLayout="horizontal"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        position: "both",
        pageSize: 10,
      }}
      dataSource={media}
      renderItem={item => <ListItem {...item} />}
    />
  );
};

export default MediaList;
