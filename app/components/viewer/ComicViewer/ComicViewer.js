// @flow
import * as React from "react";
import { Row, Col } from "antd";
import { HotKeys } from "react-hotkeys";

import MediaContext from "~/contexts/MediaContext";
import { getFiles } from "~/datastore/storage";

import ActionBar from "./ComicActionBar";

type Props = {
  bodyRef: any
};

const DummyAnchor = () => {
  const ref: any = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <a href="#" ref={ref}>
      <span />
    </a>
  );
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

  const handlers = {
    right: handleNext,
    left: handlePrev,
  };

  return (
    <HotKeys
      handlers={handlers}
      component="div"
      style={{ height: "100%", maxHeight: "100%" }}
    >
      <DummyAnchor />
      <Row style={{ height: "100%", maxHeight: "100%" }}>
        <HalfPanel align="right" filePath={pages[currentPage]} />
        <HalfPanel align="left" filePath={pages[currentPage - 1]} />
      </Row>
      {<ActionBar bodyRef={bodyRef} />}
    </HotKeys>
  );
};

export default ComicViewer;
