// @flow
import * as React from "react";
import Rate from "antd/lib/rate";

type Props = {
  disabled?: boolean,
  value?: any,
  onChange?: Function,
  style?: Object
};

const color = "#ffadd2";

const Favorite = ({ style = {}, ...otherProps }: Props) => (
  <Rate {...otherProps} style={{ ...style, color }} />
);

Favorite.defaultProps = {
  disabled: false,
  value: 0,
  onChange: () => {},
  style: {},
};

export default Favorite;
