import * as React from "react";
import { Drawer, Row, Col, List, Card, Button, Popconfirm, Checkbox, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import Image from "~/renderer/components/Image";
import IconText from "~/renderer/components/IconText";
import MediumContext from "~/renderer/contexts/MediumContext";

type Props = {
  enable?: boolean;
};

const TrimerDrawer: React.FC<Props> = ({ enable = true }) => {
  const { isShowTrimer, toggleTrimer, hideTrimer, chapters, getChapterPages, removePages, loadComic } =
    React.useContext(MediumContext);

  const [activeColumn, setActiveColumn] = React.useState<number>(0); // 0: chapters,1: pages,2: preview
  const [chapterIndex, setChapterIndex] = React.useState<number>(0);
  const [pageIndex, setPageIndex] = React.useState<number>(0);
  const [checkedPages, setCheckedPages] = React.useState<Record<string, boolean>>({});

  const selectedChapter = chapters[chapterIndex] || null;
  const pages = selectedChapter ? getChapterPages(selectedChapter) : [];
  const selectedPage = pages[pageIndex] || null;

  React.useEffect(() => {
    if (!enable) hideTrimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enable]);

  const toggleCheck = (pagePath: string) => {
    setCheckedPages((prev) => ({ ...prev, [pagePath]: !prev[pagePath] }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key;
    if (key === "ArrowLeft") {
      setActiveColumn((c) => Math.max(0, c - 1));
      e.preventDefault();
      return;
    }
    if (key === "ArrowRight") {
      setActiveColumn((c) => Math.min(2, c + 1));
      e.preventDefault();
      return;
    }

    if (key === "ArrowUp") {
      if (activeColumn === 0) setChapterIndex((i) => Math.max(0, i - 1));
      if (activeColumn === 1) setPageIndex((i) => Math.max(0, i - 1));
      e.preventDefault();
      return;
    }
    if (key === "ArrowDown") {
      if (activeColumn === 0) setChapterIndex((i) => Math.min(chapters.length - 1, i + 1));
      if (activeColumn === 1) setPageIndex((i) => Math.min(pages.length - 1, i + 1));
      e.preventDefault();
      return;
    }

    if (key === " ") {
      // space toggles check when column 1 active
      if (activeColumn === 1 && pages[pageIndex]) {
        toggleCheck(pages[pageIndex]);
        e.preventDefault();
      }
    }
  };

  const handleDelete = async () => {
    const targets = Object.keys(checkedPages).filter((p) => checkedPages[p]);
    await removePages(targets);

    loadComic();
    setCheckedPages({});
  };

  return (
    <Drawer
      title={<IconText icon="read" text="Remove Pages" />}
      onClose={toggleTrimer}
      open={isShowTrimer}
      placement="left"
      size={1150}
      destroyOnHidden
    >
      <div tabIndex={0} onKeyDown={handleKeyDown} style={{ outline: "none" }}>
        <Row gutter={16} style={{ height: "75vh" }}>
          <Col span={6} style={{ overflow: "auto", borderRight: activeColumn === 0 ? "2px solid #1890ff" : undefined }}>
            <List
              dataSource={chapters}
              renderItem={(ch, idx) => (
                <List.Item
                  key={ch.chapterNo}
                  style={{ background: idx === chapterIndex ? "#e6f7ff" : undefined, cursor: "pointer" }}
                  onClick={() => {
                    setChapterIndex(idx);
                    setPageIndex(0);
                    setActiveColumn(1);
                  }}
                >
                  <Card size="small" style={{ width: "100%" }}>
                    <Card.Meta title={ch.chapterNo} description={ch.createdAt} />
                  </Card>
                </List.Item>
              )}
            />
          </Col>

          <Col
            span={10}
            style={{ overflow: "auto", borderRight: activeColumn === 1 ? "2px solid #1890ff" : undefined }}
          >
            <List
              grid={{ gutter: 8, column: 3 }}
              dataSource={pages}
              renderItem={(page, idx) => (
                <List.Item key={page} style={{ textAlign: "center" }}>
                  <Card
                    hoverable
                    size="small"
                    style={{ border: idx === pageIndex ? "2px solid #1890ff" : undefined }}
                    onClick={() => setPageIndex(idx)}
                  >
                    <Image height={120} alt={page} src={page} />
                    <div style={{ marginTop: 8 }}>
                      <Checkbox checked={!!checkedPages[page]} onChange={() => toggleCheck(page)}>
                        <Typography.Text ellipsis style={{ width: 120, display: "inline-block" }}>
                          {page.split("/").pop()}
                        </Typography.Text>
                      </Checkbox>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Col>

          <Col span={8} style={{ overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {selectedPage ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <Image alt={selectedPage} src={selectedPage} style={{ maxHeight: "70vh", maxWidth: "100%" }} />
                <div style={{ marginTop: 12 }}>
                  <Typography.Text>{selectedPage.split("/").pop()}</Typography.Text>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <Typography.Text type="secondary">Select a page to preview</Typography.Text>
              </div>
            )}
          </Col>
        </Row>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
          <Popconfirm title="Are you sure delete selected pages?" onConfirm={handleDelete} okText="Yes" cancelText="No">
            <Button icon={<DeleteOutlined />} danger>
              Delete Selected
            </Button>
          </Popconfirm>
        </div>
      </div>
    </Drawer>
  );
};

export default TrimerDrawer;
