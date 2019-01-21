import * as React from "react";
import { Icon } from "antd";

type Props = {
  icon: string,
  text: any
};

const IconText = ({ icon, text }: Props) => (
  <span>
    <Icon type={icon} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default IconText;
