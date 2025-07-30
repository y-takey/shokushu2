import * as React from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Drawer, List, Card, Popconfirm, Button, Flex, Typography, message } from "antd";

import IconText from "~/renderer/components/IconText";
import Image from "~/renderer/components/Image";
import MediumContext from "~/renderer/contexts/MediumContext";
import { Chapter } from "~/types";

type Props = {
  enable?: boolean;
};

const CardCover: React.FC<{ chapter: Chapter; onClick: () => void }> = (props) => {
  const {
    chapter: { chapterNo, headPath },
    onClick,
  } = props;

  return (
    <div style={{ height: "300px", width: "100%", overflow: "hidden" }} onClick={onClick}>
      <Image height="100%" alt={chapterNo} src={headPath} />
    </div>
  );
};

const CardDetail: React.FC<{ chapter: Chapter; onClick: () => void }> = (props) => {
  const {
    chapter: { chapterNo, createdAt },
    onClick,
  } = props;

  return (
    <Flex justify="space-between" align="center">
      <Typography.Text strong>{chapterNo}</Typography.Text>
      <Typography.Text type="secondary">{createdAt}</Typography.Text>
      <Popconfirm
        title="Are you sure archive this chapter?"
        placement="left"
        onConfirm={onClick}
        okText="Yes"
        cancelText="No"
      >
        <Button icon={<DeleteOutlined />} color="danger" size="small" variant="text" />
      </Popconfirm>
    </Flex>
  );
};

const ChapterDrawer: React.FC<Props> = ({ enable = true }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { isShowChapters, toggleChapters, hideChapters, chapters, movePosition, pruneChapter } =
    React.useContext(MediumContext);

  React.useEffect(() => {
    if (!enable) hideChapters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enable]);

  const handleClick = (chapterIndex: number) => () => {
    movePosition(chapterIndex + 1);
    toggleChapters();
  };

  const handlePrune = (chapter: Chapter) => () => {
    pruneChapter(chapter);
    messageApi.success("archived!", 1);
  };

  const handlePruneAll = () => {
    chapters.forEach((chapter) => pruneChapter(chapter));
    messageApi.success("all archived!", 1);
  };

  return (
    <Drawer
      title={<IconText icon="read" text="Chapters" />}
      extra={
        <Popconfirm
          title="Are you sure archive all chapters?"
          placement="bottom"
          onConfirm={handlePruneAll}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} color="danger" variant="outlined" size="small">
            Archive All
          </Button>
        </Popconfirm>
      }
      closable={false}
      destroyOnClose
      onClose={toggleChapters}
      placement="left"
      width={1150}
      open={isShowChapters}
    >
      {contextHolder}
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={chapters}
        renderItem={(chapter) => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 210 }}
              styles={{ body: { padding: 8 } }}
              cover={<CardCover chapter={chapter} onClick={handleClick(chapter.headIndex)} />}
            >
              <Card.Meta description={<CardDetail chapter={chapter} onClick={handlePrune(chapter)} />} />
            </Card>
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default ChapterDrawer;
