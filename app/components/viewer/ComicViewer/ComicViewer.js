// @flow
import * as React from "react";
import { Row, Col } from "antd";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { getFiles } from "~/datastore/storage";

import ActionBar from "./ComicActionBar";

type Props = {
  bodyRef: any
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

const ComicViewer = ({ bodyRef }: Props) => {
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

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      changeCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      changeCurrentPage(currentPage - 1);
    }
  };

  const keyMap = {
    SHOW_NEXT: "right",
    SHOW_PREV: "left",
  };

  const handlers = {
    SHOW_NEXT: handleNext,
    SHOW_PREV: handlePrev,
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
      {<ActionBar bodyRef={bodyRef} />}
    </>
  );
};

export default ComicViewer;
