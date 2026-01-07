import * as React from "react";
import { Layout } from "antd";

type Props = {
  children: React.ReactNode;
};

const style = {
  background: "#f5f5f5",
  lineHeight: "40px",
  height: "40px",
  padding: "0 16px",
};

const Header: React.FC<Props> = ({ children }) => <Layout.Header style={style}>{children}</Layout.Header>;

export default Header;
