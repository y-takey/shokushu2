// @flow
import * as React from "react";
import { Row, Col } from "antd";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { getFiles } from "~/datastore/storage";

import ActionBar from "./ComicActionBar";

type Props = {
  handleFullscreen: Function
};

const HalfPanel = ({
  align,
  filePath,
}: {
  align: "left" | "right",
  filePath: string
}) => (
  <Col
    span={12}
    style={{
      height: "100%",
      textAlign: align,
      backgroundColor: "black",
    }}
  >
    <img alt="" height="100%" src={filePath} />
  </Col>
);

const ComicViewer = ({ handleFullscreen }: Props) => {
  const { changeHotKeys } = React.useContext(AppContext);
  const {
    currentMedia: { path },
  } = React.useContext(MediaContext);
  const [pages, changePages] = React.useState([]);
  const [currentPage, changeCurrentPage] = React.useState(0);

  React.useEffect(() => {
    const fileNames = getFiles(path, "comic").sort();
    changePages(fileNames.map(name => `${path}/${name}`));
    changeCurrentPage(1);
  }, []);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      changeCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      changeCurrentPage(currentPage - 1);
    }
  };

  const handleNextBookmark = () => {
    console.log("[handleNextBookmark] go to 20");
    changeCurrentPage(20);
  };

  const handlePrevBookmark = () => {
    console.log("[handleNextBookmark] go to 10");
    changeCurrentPage(10);
  };

  const handleAddBookmark = () => {
    console.log("[handleAddBookmark] page:", currentPage);
  };

  const keyMap = {
    SHOW_NEXT_PAGE: "right",
    SHOW_PREV_PAGE: "left",
    SHOW_NEXT_BOOKMARK: "down",
    SHOW_PREV_BOOKMARK: "up",
    SHOW_PAGE: "none",
    ADD_BOOKMARK: "b",
    TOGGLE_FULL_SCREEN: "f",
  };

  const handlers = {
    SHOW_NEXT_PAGE: handleNextPage,
    SHOW_PREV_PAGE: handlePrevPage,
    SHOW_NEXT_BOOKMARK: handleNextBookmark,
    SHOW_PREV_BOOKMARK: handlePrevBookmark,
    SHOW_PAGE: changeCurrentPage,
    ADD_BOOKMARK: handleAddBookmark,
    TOGGLE_FULL_SCREEN: handleFullscreen,
  };

  React.useEffect(
    () => {
      changeHotKeys({ keyMap, handlers });
    },
    [pages, currentPage]
  );
  return (
    <>
      <Row style={{ height: "100%", maxHeight: "100%" }}>
        <HalfPanel align="right" filePath={pages[currentPage]} />
        <HalfPanel align="left" filePath={pages[currentPage - 1]} />
      </Row>
      {
        <ActionBar
          maxPage={pages.length}
          currentPage={currentPage}
          handlers={handlers}
          bookmarks={[10, 20]}
        />
      }
    </>
  );
};

export default ComicViewer;
