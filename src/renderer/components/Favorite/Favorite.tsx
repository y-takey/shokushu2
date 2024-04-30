import * as React from "react";
import { Rate } from "antd";

type Props = {
  disabled?: boolean;
  value?: any;
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
};

const color = "#ffadd2";

const Favorite: React.FC<Props> = (props) => {
  const { style = {}, disabled = false, value = 0, onChange = () => {} } = props;
  const otherProps = { disabled, value, onChange };

  return <Rate {...otherProps} style={{ ...style, color }} />;
};

export default Favorite;
