import * as React from "react";
import { Drawer, List, Card } from "antd";

import IconText from "~/renderer/components/IconText";
import MediumContext from "~/renderer/contexts/MediumContext";
import { Chapter } from "~/types";

type Props = {
  enable?: boolean;
};

const CardCover: React.FC<{ chapter: Chapter }> = ({ chapter: { chapterNo, headPath } }) => (
  <div style={{ height: "300px", width: "100%", overflow: "hidden" }}>
    <img height="100%" alt={chapterNo} src={headPath} />
  </div>
);

const ChapterDrawer: React.FC<Props> = ({ enable = true }) => {
  const { isShowChapters, toggleChapters, hideChapters, chapters, movePosition } = React.useContext(MediumContext);

  React.useEffect(() => {
    if (!enable) hideChapters();
  }, [enable]);

  const handleClick = (chapterIndex: number) => () => {
    movePosition(chapterIndex + 1);
    toggleChapters();
  };

  return (
    <Drawer
      title={<IconText icon="read" text="Chapters" />}
      closable={false}
      destroyOnClose
      onClose={toggleChapters}
      placement="left"
      width={1150}
      open={isShowChapters}
    >
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={chapters}
        renderItem={(chapter) => (
          <List.Item onClick={handleClick(chapter.headIndex)}>
            <Card hoverable style={{ width: 210 }} bodyStyle={{ padding: 8 }} cover={<CardCover chapter={chapter} />}>
              <Card.Meta description={chapter.chapterNo} />
            </Card>
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default ChapterDrawer;
