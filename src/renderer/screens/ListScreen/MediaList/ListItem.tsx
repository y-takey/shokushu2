import * as React from "react";
import { List } from "antd";
import styled from "@emotion/styled";

import AppContext from "~/renderer/contexts/AppContext";
import { MediumProvider } from "~/renderer/contexts/MediumContext";
import EditorDrawer from "~/renderer/components/drawer/EditorDrawer";
import ChapterDrawer from "~/renderer/components/drawer/ChapterDrawer";
import ListContext from "~/renderer/screens/ListScreen/ListContext";
import { Media } from "~/types";

import Body from "./Body";
import Thumbnail from "./Thumbnail";

interface Props {
  media: Media;
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

const ListItem: React.FC<Props> = ({ media }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const { _id: mediumId, title } = media;
  const { update } = React.useContext(AppContext);
  const { isSelected, itemEvent, isAuthorFilter } = React.useContext(ListContext);
  const selected = isSelected(mediumId);

  const viewItem = () => {
    update({ mode: "view", selectedId: mediumId });
  };

  React.useEffect(() => {
    if (!selected) return;

    if (itemRef.current) itemRef.current.scrollIntoView({ block: "nearest" });
  }, [selected]);

  React.useEffect(() => {
    if (!isSelected(mediumId) || !itemEvent) return;

    if (itemEvent === "view") viewItem();
  }, [itemEvent]);

  return (
    <MediumProvider medium={media} key={mediumId}>
      <div ref={itemRef}>
        <List.Item style={selected ? selectedStyle : {}}>
          <ListItemMeta
            avatar={<Thumbnail media={media} />}
            title={
              <Title href="#" onClick={viewItem}>
                {title}
              </Title>
            }
            description={<Body media={media} />}
          />
        </List.Item>
      </div>
      <EditorDrawer enable={!isAuthorFilter} />
      <ChapterDrawer enable={!isAuthorFilter} />
    </MediumProvider>
  );
};

export default ListItem;
