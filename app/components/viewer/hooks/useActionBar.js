// @flow
import throttle from "lodash/throttle";
import * as React from "react";
import { Icon, Slider } from "antd";
import styled from "@emotion/styled";

const Bar = styled("div")`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  line-height: 2em;
  padding: 0 0.5em;
`;

const Cell = styled("div")`
  display: inline-block;
  text-align: center;
  width: ${props => props.width || 30}px;
`;

const Label = styled("span")`
  color: lightgray;
  font-size: 0.8em;
`;

const generateMarks = bookmarks =>
  bookmarks.reduce((ret, value) => ({ ...ret, [value]: "" }), {});

const useFadeOut = initialValue => {
  const [value, set] = React.useState(initialValue);
  const timerId = React.useRef(null);

  const handler = throttle(() => {
    set(true);

    if (timerId.current) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      set(false);
    }, 2000);
  }, 1000);

  return [value, { onMouseMove: handler }];
};

type ActionItem = {
  key: string,
  content: any,
  action?: Function,
  width?: number
};

const useActionBar = (
  currentPosition: number,
  mediaRange: { min: number, max: number },
  bookmarks: Array<number>,
  handlers: Object,
  positionFormatter?: Function = v => v,
  extendItems?: Array<ActionItem> = []
) => {
  const [isFadeOut, fadeOutHandler] = useFadeOut(true);

  const slider = (
    <Slider
      min={mediaRange.min}
      max={mediaRange.max}
      value={currentPosition}
      marks={generateMarks(bookmarks)}
      onChange={handlers.MOVE_POSITION}
      style={{ marginTop: 10, marginBottom: 0 }}
      tipFormatter={positionFormatter}
    />
  );

  const label = (
    <Label>
      {positionFormatter(currentPosition)}/{positionFormatter(mediaRange.max)}
    </Label>
  );

  const barItems = [
    ...extendItems,
    {
      key: "bookmark",
      content: <Icon type="book" />,
      action: handlers.ADD_BOOKMARK,
    },
    {
      key: "move-prev",
      content: <Icon type="left" />,
      action: handlers.MOVE_PREV_POSITION,
    },
    {
      key: "move-next",
      content: <Icon type="right" />,
      action: handlers.MOVE_NEXT_POSITION,
    },
    { key: "slider", content: slider, width: 300 },
    { key: "lable", content: label, width: 80 },
    {
      key: "prev-bookmark",
      content: <Icon type="vertical-right" />,
      action: handlers.MOVE_PREV_BOOKMARK,
    },
    {
      key: "next-bookmark",
      content: <Icon type="vertical-left" />,
      action: handlers.MOVE_NEXT_BOOKMARK,
    },
    {
      key: "fullscreen",
      content: <Icon type="fullscreen" />,
      action: handlers.TOGGLE_FULL_SCREEN,
    },
  ];

  const actionBar = (
    <Bar style={{ visibility: isFadeOut ? "visible" : "hidden" }}>
      {barItems.map(item => {
        const { key, content, action: onClick, width } = {
          action: null,
          width: 0,
          ...item,
        };
        return <Cell {...{ key, width, onClick }}>{content}</Cell>;
      })}
    </Bar>
  );

  return [actionBar, fadeOutHandler];
};

export default useActionBar;
