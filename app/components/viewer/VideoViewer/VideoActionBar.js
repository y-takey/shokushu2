// @flow
import * as React from "react";
import { Row, Col, Icon, Slider } from "antd";
import styled from "@emotion/styled";

import { formatSeconds } from "~/utils/date";

type Props = {
  maxPage: number,
  currentPage: number,
  bookmarks: Array<number>,
  handlers: Object,
  isFadeOut: boolean,
  isPlaying: boolean
};

const Bar = styled(Row)`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 70%;
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

const VideoActionBar = ({
  maxPage,
  currentPage,
  handlers,
  bookmarks,
  isFadeOut,
  isPlaying,
}: Props) => (
  <Bar style={{ visibility: isFadeOut ? "visible" : "hidden" }}>
    <Cell span={1} onClick={handlers.TOGGLE_PLAY}>
      <Icon type={isPlaying ? "stop" : "caret-right"} />
    </Cell>
    <Cell span={1} onClick={handlers.ADD_BOOKMARK}>
      <Icon type="book" />
    </Cell>
    <Cell span={1} onClick={handlers.MOVE_PREV_POSITION}>
      <Icon type="left" />
    </Cell>
    <Cell span={1} onClick={handlers.MOVE_NEXT_POSITION}>
      <Icon type="right" />
    </Cell>
    <Cell span={14}>
      <Slider
        min={1}
        max={maxPage}
        value={currentPage}
        marks={generateMarks(bookmarks)}
        onChange={handlers.MOVE_POSITION}
        style={{ marginTop: 8, marginBottom: 0 }}
      />
    </Cell>
    <Cell span={3}>
      <Label>
        {formatSeconds(currentPage)}/{formatSeconds(maxPage)}
      </Label>
    </Cell>
    <Cell span={1} onClick={handlers.MOVE_PREV_BOOKMARK}>
      <Icon type="vertical-right" />
    </Cell>
    <Cell span={1} onClick={handlers.MOVE_NEXT_BOOKMARK}>
      <Icon type="vertical-left" />
    </Cell>
    <Cell span={1} onClick={handlers.TOGGLE_FULL_SCREEN}>
      <Icon type="fullscreen" />
    </Cell>
  </Bar>
);

export default VideoActionBar;
