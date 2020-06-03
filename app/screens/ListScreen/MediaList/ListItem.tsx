import * as React from "react";
import { List } from "antd";
import styled from "@emotion/styled";

import AppContext from "~/contexts/AppContext";
import { MediumProvider } from "~/contexts/MediumContext";
import EditorDrawer from "~/components/drawer/EditorDrawer";
import { Media } from "~/types";

import Body from "./Body";
import Thumbnail from "./Thumbnail";

interface Props {
  media: Media;
  selected?: boolean;
}

const Title = styled("a")`
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ListItemMeta = styled(List.Item.Meta)`
  overflow: hidden;
  .ant-list-item-meta-content {
    overflow: hidden;
  }

  .ant-list-item-meta-title {
    margin-bottom: 0px;
    line-height: 18px;
  }
`;

const selectedStyle = {
  backgroundColor: "rgb(230, 247, 255)",
};

const ListItem: React.FC<Props> = ({ media, selected }) => {
  const itemRef = React.useRef<HTMLDivElement>();
  const { _id, title } = media;
  const { update } = React.useContext(AppContext);

  React.useEffect(() => {
    if (!selected) return;

    if (itemRef.current) itemRef.current.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const handleClick = () => {
    update({
      mode: "view",
      selectedId: _id,
    });
  };

  return (
    <MediumProvider medium={media} key={_id}>
      <div ref={itemRef}>
        <List.Item style={selected ? selectedStyle : {}}>
          <ListItemMeta
            avatar={<Thumbnail media={media} />}
            title={
              <Title href="#" onClick={handleClick}>
                {title}
              </Title>
            }
            description={<Body media={media} />}
          />
        </List.Item>
      </div>
      <EditorDrawer />
    </MediumProvider>
  );
};

ListItem.defaultProps = {
  selected: false,
};

export default ListItem;
