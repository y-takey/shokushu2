import * as React from "react";

type InputProps = {
  value: any;
  onChange: (val: any) => void;
};

const useInput = (initialValue: any, getValue?: (val: any) => any): [InputProps, any] => {
  const [value, set] = React.useState(initialValue);

  const onChange = (val: any) => set(getValue ? getValue(val) : val);

  return [{ value, onChange }, set];
};

export default useInput;
