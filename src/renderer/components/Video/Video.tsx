import * as React from "react";

type Props = React.ComponentPropsWithRef<"video">;

const Video: React.FC<Props> = (props) => {
  const { src = "", ...otherProps } = props;

  return <video src={`file://${src}`} {...otherProps} />;
};

export default Video;
