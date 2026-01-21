import * as React from "react";
import { Drawer, Row, Col, List, Card, Button, Popconfirm, Checkbox, Space } from "antd";
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

  const ref = React.useRef<HTMLDivElement>(null);
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

  React.useEffect(() => {
    if (isShowTrimer) {
      ref.current?.focus();
      // console.log("mountted");
    }
  }, [isShowTrimer]);

  const toggleCheck = (pagePath: string) => {
    setCheckedPages((prev) => ({ ...prev, [pagePath]: !prev[pagePath] }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key;
    const isTargetKey = key.startsWith("Arrow") || key === " ";
    if (!isTargetKey) {
      return;
    }

    e.stopPropagation();
    e.preventDefault();

    if (key === "ArrowLeft") {
      setActiveColumn(0);
      return;
    }
    if (key === "ArrowRight") {
      setActiveColumn(1);
      return;
    }

    if (key === "ArrowUp") {
      if (activeColumn === 0) setChapterIndex((i) => Math.max(0, i - 1));
      if (activeColumn === 1) setPageIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (key === "ArrowDown") {
      if (activeColumn === 0) setChapterIndex((i) => Math.min(chapters.length - 1, i + 1));
      if (activeColumn === 1) setPageIndex((i) => Math.min(pages.length - 1, i + 1));
      return;
    }

    if (key === " ") {
      if (activeColumn === 1 && pages[pageIndex]) {
        toggleCheck(pages[pageIndex]);
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
      closable={false}
      destroyOnHidden
      extra={
        <Popconfirm
          title="Are you sure delete selected pages?"
          placement="bottom"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} color="danger" variant="outlined" size="small">
            Delete Selected
          </Button>
        </Popconfirm>
      }
    >
      <div tabIndex={0} onKeyDown={handleKeyDown} style={{ outline: "none" }} ref={ref}>
        <Row gutter={16} style={{ height: "calc(100vh - 110px)" }}>
          <Col
            span={4}
            style={{
              maxHeight: "100%",
              borderRight: "1px solid lightgray",
            }}
          >
            <List
              dataSource={chapters}
              bordered={false}
              renderItem={(ch, idx) => (
                <List.Item
                  key={ch.chapterNo}
                  onClick={() => {
                    setChapterIndex(idx);
                    setPageIndex(0);
                    setActiveColumn(1);
                  }}
                  style={{ textAlign: "center", border: "none" }}
                >
                  <Card
                    size="small"
                    style={{
                      width: "100%",
                      background: idx === chapterIndex ? "#e6f7ff" : undefined,
                      borderColor: activeColumn === 0 && idx === chapterIndex ? "#1890ff" : undefined,
                      cursor: "pointer",
                    }}
                  >
                    <Image height={120} alt={ch.chapterNo} src={ch.headPath} />
                    <div>
                      {ch.chapterNo}: {ch.createdAt}
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Col>

          <Col
            span={6}
            style={{
              overflow: "auto",
              maxHeight: "100%",
              borderRight: "1px solid lightgray",
            }}
          >
            <List
              dataSource={pages}
              renderItem={(page, idx) => (
                <List.Item key={page} style={{ textAlign: "center", border: "none", padding: 0 }}>
                  <Card
                    size="small"
                    style={{
                      width: "100%",
                      border: idx === pageIndex ? `2px solid ${activeColumn === 1 ? "#1890ff" : "#1890ff77"}` : "none",
                    }}
                    styles={{ body: { padding: 4 } }}
                    onClick={() => setPageIndex(idx)}
                  >
                    <Space>
                      <Checkbox checked={!!checkedPages[page]} onChange={() => toggleCheck(page)}>
                        {page.split("/").pop()}
                      </Checkbox>
                      <Image height={120} alt={page} src={page} />
                    </Space>
                  </Card>
                </List.Item>
              )}
            />
          </Col>

          <Col span={14} style={{ overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {selectedPage ? (
              <div style={{ width: "100%", textAlign: "center" }}>
                <Image
                  alt={selectedPage}
                  src={selectedPage}
                  style={{ maxHeight: "80vh", maxWidth: "100%", border: "1px solid lightgray" }}
                />
              </div>
            ) : (
              <> </>
            )}
          </Col>
        </Row>
      </div>
    </Drawer>
  );
};

export default TrimerDrawer;
