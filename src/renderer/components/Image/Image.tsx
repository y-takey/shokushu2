import * as React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

const Image: React.FC<Props> = (props) => {
  const { src = "", ...otherProps } = props;

  return <img src={`shokushu-image://${src}`} {...otherProps} />;
};

export default Image;
