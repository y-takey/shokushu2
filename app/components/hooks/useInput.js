// @flow
import * as React from "react";

const useInput = (initialValue: any, getValue?: (val: any) => any) => {
  // $FlowFixMe
  const [value, set] = React.useState(initialValue);
  const onChange = (val: any) => set(getValue ? getValue(val) : val);

  return [{ value, onChange }, set];
};

export default useInput;
