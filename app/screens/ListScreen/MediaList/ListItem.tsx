import * as React from "react";
import { List } from "antd";
import styled from "@emotion/styled";

import AppContext from "~/contexts/AppContext";
import { MediumProvider } from "~/contexts/MediumContext";
import EditorDrawer from "~/components/drawer/EditorDrawer";
import ChapterDrawer from "~/components/drawer/ChapterDrawer";
import { Media } from "~/types";
import ListContext from "~/screens/ListScreen/ListContext";

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
  const itemRef = React.useRef<HTMLDivElement>();
  const { _id: mediumId, title } = media;
  const { update } = React.useContext(AppContext);
  const { isSelected, itemEvent } = React.useContext(ListContext);
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
      <EditorDrawer />
      <ChapterDrawer />
    </MediumProvider>
  );
};

export default ListItem;
