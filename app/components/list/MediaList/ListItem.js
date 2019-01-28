// @flow
import * as React from "react";
import { List } from "antd";

import AppContext from "~/contexts/AppContext";

import Body from "./ListItem/Body";
import Thumbnail from "./ListItem/Thumbnail";
import type { MediaType } from "./MediaType";

const ListItem = (props: MediaType) => {
  const { _id, title } = props;
  const { update } = React.useContext(AppContext);

  const handleClick = () => {
    update({ mode: "view", selectedId: _id });
  };

  return (
    <List.Item key={_id}>
      <List.Item.Meta
        avatar={<Thumbnail {...props} />}
        title={
          <a href="#" onClick={handleClick}>
            {title}
          </a>
        }
        description={<Body {...props} />}
      />
    </List.Item>
  );
};

export default ListItem;
