import React, { ComponentProps } from "react";
import { Select, RefSelectProps } from "antd";

type Props = ComponentProps<typeof Select> & {
  items: Array<string>;
  mode?: "multiple" | "tags";
};

const SelectInput: React.FC<Props> = (props) => {
  const { items, mode = "tags", autoFocus, ...otherProps } = props;
  const options = React.useMemo(() => items.map((item) => ({ value: item, label: item })), [items]);
  const selectRef = React.useRef<RefSelectProps>();
  const containerRef = React.useRef<HTMLDivElement>();
  const [width, setWidth] = React.useState<number>();

  React.useEffect(() => {
    if (autoFocus && selectRef.current) {
      selectRef.current.focus();
    }
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }
  }, []);

  return (
    <div ref={containerRef}>
      <Select
        mode={mode}
        style={{ width: "100%" }}
        dropdownMatchSelectWidth={width}
        options={options}
        autoFocus={autoFocus}
        ref={selectRef}
        {...otherProps}
      />
    </div>
  );
};

export default SelectInput;
