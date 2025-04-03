import React, { ComponentProps } from "react";
import { Select, RefSelectProps } from "antd";

type Props = ComponentProps<typeof Select> & {
  items: Array<string>;
  mode?: "multiple" | "tags";
};

const SelectInput: React.FC<Props> = (props) => {
  const { items, mode = "tags", autoFocus, ...otherProps } = props;
  const options = React.useMemo(() => items.map((item) => ({ value: item, label: item })), [items]);
  const selectRef = React.useRef<RefSelectProps>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState<number>();

  React.useEffect(() => {
    if (autoFocus && selectRef.current) {
      selectRef.current.focus();
    }
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef}>
      <Select
        mode={mode}
        style={{ width: "100%" }}
        popupMatchSelectWidth={width}
        options={options}
        autoFocus={autoFocus}
        ref={selectRef}
        {...otherProps}
      />
    </div>
  );
};

export default SelectInput;
