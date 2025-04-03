import { Row, Col } from "antd";

type Props = {
  filePaths: {
    left: string | null | undefined;
    right: string | null | undefined;
  };
};

const HalfPanel = ({ align, filePath }: { align: "left" | "right"; filePath: string }) => (
  <Col
    span={12}
    style={{
      height: "100%",
      textAlign: align,
      backgroundColor: "black",
    }}
  >
    <img alt="" height="100%" src={filePath} />
  </Col>
);

const Panel = ({ filePaths: { left, right }, ...otherProps }: Props) => (
  <Row
    style={{
      height: "100%",
      maxHeight: "100%",
    }}
    {...otherProps}
  >
    <HalfPanel align="right" filePath={left || ""} />
    <HalfPanel align="left" filePath={right || ""} />
  </Row>
);

export default Panel;
