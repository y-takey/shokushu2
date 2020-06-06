import * as React from "react";

import {
  BookOutlined,
  FullscreenOutlined,
  LeftOutlined,
  RightOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import { Slider } from "antd";
import styled from "@emotion/styled";

import MediumContext from "~/contexts/MediumContext";

const Bar = styled("div")`
  position: absolute;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  line-height: 2em;
  padding: 0 0.5em;
`;

type CellProps = {
  width: number;
};

const Cell = styled("div")`
  display: inline-block;
  text-align: center;
  width: ${(props: CellProps) => props.width || 30}px;
`;

const Label = styled("span")`
  color: lightgray;
  font-size: 0.8em;
`;

const generateMarks = (bookmarks) =>
  bookmarks.reduce(
    (ret, value) => ({
      ...ret,
      [value]: "",
    }),
    {}
  );

type ActionItem = {
  key: string;
  content: any;
  action?: () => void;
  width?: number;
};

interface Props {
  positionFormatter?: (value: number) => React.ReactNode;
  extendItems?: Array<ActionItem>;
}

const ActionBar: React.FC<Props> = ({ positionFormatter, extendItems }) => {
  const {
    currentPosition,
    bookmarks,
    size: maxPosition,
    minPosition,
    addBookmark,
    nextBookmark,
    prevBookmark,
    movePosition,
    nextPosition,
    prevPosition,
    isShowActionBar,
    toggleFullScreen,
  } = React.useContext(MediumContext);

  const slider = (
    <Slider
      min={minPosition}
      max={maxPosition}
      value={currentPosition}
      marks={generateMarks(bookmarks)}
      onChange={movePosition as any}
      style={{
        marginTop: 10,
        marginBottom: 0,
      }}
      tipFormatter={positionFormatter}
    />
  );

  const label = (
    <Label>
      {positionFormatter(currentPosition)}/{positionFormatter(maxPosition)}
    </Label>
  );

  const barItems = [
    ...extendItems,
    {
      key: "bookmark",
      content: <BookOutlined />,
      action: addBookmark,
    },
    {
      key: "move-prev",
      content: <LeftOutlined />,
      action: prevPosition,
    },
    {
      key: "move-next",
      content: <RightOutlined />,
      action: nextPosition,
    },
    {
      key: "slider",
      content: slider,
      width: 300,
    },
    {
      key: "lable",
      content: label,
      width: 80,
    },
    {
      key: "prev-bookmark",
      content: <VerticalRightOutlined />,
      action: prevBookmark,
    },
    {
      key: "next-bookmark",
      content: <VerticalLeftOutlined />,
      action: nextBookmark,
    },
    {
      key: "fullscreen",
      content: <FullscreenOutlined />,
      action: toggleFullScreen,
    },
  ];

  return (
    <Bar style={{ visibility: isShowActionBar ? "visible" : "hidden" }}>
      {barItems.map((item) => {
        const { key, content, action: onClick, width } = {
          action: null,
          width: 0,
          ...item,
        };
        return (
          <Cell key={key} width={width} onClick={onClick as any}>
            {content}
          </Cell>
        );
      })}
    </Bar>
  );
};

ActionBar.defaultProps = {
  positionFormatter: (v) => v,
  extendItems: [],
};

export default ActionBar;
