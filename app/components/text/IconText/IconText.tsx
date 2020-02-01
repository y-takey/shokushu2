import * as React from "react";

type Props = {
  icon: React.ElementType;
  text: any;
};

const IconText = ({ icon: Icon, text }: Props) => (
  <span>
    <Icon />
    <span style={{ marginLeft: 8 }}>{text}</span>
  </span>
);

export default IconText;
