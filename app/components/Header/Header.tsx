import * as React from "react";
import { Layout } from "antd";

type Props = {};

const style = {
  background: "#f0f2f5",
  lineHeight: "58px",
  height: "58px",
  padding: "0 16px",
};

const Header: React.FC<Props> = ({ children }) => <Layout.Header style={style}>{children}</Layout.Header>;

export default Header;
