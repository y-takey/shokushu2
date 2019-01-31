// @flow
import * as React from "react";
import { Row, Col, Icon, Slider } from "antd";
import styled from "@emotion/styled";

type Props = {
  maxPage: number,
  currentPage: number,
  bookmarks: Array<number>,
  handlers: Object,
  isFadeOut: boolean
};

const Bar = styled(Row)`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 45%;
  line-height: 2em;
`;

const Cell = styled(Col)`
  text-align: center;
`;

const Label = styled("span")`
  color: lightgray;
  font-size: 0.8em;
`;

const generateMarks = bookmarks =>
  bookmarks.reduce((ret, value) => ({ ...ret, [value]: "" }), {});

const ComicActionBar = ({
  maxPage,
  currentPage,
  handlers,
  bookmarks,
  isFadeOut,
}: Props) => (
  <Bar style={{ visibility: isFadeOut ? "visible" : "hidden" }}>
    <Cell span={2} onClick={handlers.ADD_BOOKMARK}>
      <Icon type="book" theme="filled" />
    </Cell>
    <Cell span={2} onClick={handlers.SHOW_PREV_PAGE}>
      <Icon type="left" />
    </Cell>
    <Cell span={2} onClick={handlers.SHOW_NEXT_PAGE}>
      <Icon type="right" />
    </Cell>
    <Cell span={10}>
      <Slider
        min={1}
        max={maxPage}
        value={currentPage}
        marks={generateMarks(bookmarks)}
        onChange={handlers.SHOW_PAGE}
        style={{ marginTop: 8, marginBottom: 0 }}
      />
    </Cell>
    <Cell span={2}>
      <Label>
        {currentPage}/{maxPage}
      </Label>
    </Cell>
    <Cell span={2} onClick={handlers.SHOW_PREV_BOOKMARK}>
      <Icon type="vertical-right" />
    </Cell>
    <Cell span={2} onClick={handlers.SHOW_NEXT_BOOKMARK}>
      <Icon type="vertical-left" />
    </Cell>
    <Cell span={2} onClick={handlers.TOGGLE_FULL_SCREEN}>
      <Icon type="fullscreen" />
    </Cell>
  </Bar>
);

export default ComicActionBar;
