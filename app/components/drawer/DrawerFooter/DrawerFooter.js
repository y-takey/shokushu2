// @flow
import * as React from "react";
import styled from "@emotion/styled";

type Props = {
  children: Array<any>
};

const Footer = styled("div")`
  background: #fff;
  border-radius: 0 0 4px 4px;
  border-top: 1px solid #e8e8e8;
  bottom: 0;
  left: 0;
  position: absolute;
  padding: 10px 16px;
  text-align: right;
  width: 100%;
`;

const DrawerFooter = ({ children }: Props) => (
  <Footer>
    {children.map(child => (
      <span style={{ marginLeft: 8 }}>{child}</span>
    ))}
  </Footer>
);

export default DrawerFooter;
