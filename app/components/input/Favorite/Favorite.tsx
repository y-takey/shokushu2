import * as React from "react";
import Rate from "antd/lib/rate";

type Props = {
  disabled?: boolean;
  value?: any;
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
};

const color = "#ffadd2";

const Favorite: React.FC<Props> = ({ style = {}, ...otherProps }) => (
  <Rate {...otherProps} style={{ ...style, color }} />
);

Favorite.defaultProps = {
  disabled: false,
  value: 0,
  onChange: () => {},
  style: {},
};

export default Favorite;
