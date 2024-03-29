import * as React from "react";

import AppContext from "~/renderer/contexts/AppContext";
import { Setting } from "~/types";

const useSettingValue = <T>(key: keyof Setting): [T, (value: any) => void] => {
  const { [key]: persistedValue, update } = React.useContext(AppContext);
  const [value, set] = React.useState(persistedValue);

  React.useEffect(() => {
    set(persistedValue);
  }, [persistedValue]);

  const handleChange = (newValue: any) => {
    set(newValue);
    update({
      [key]: newValue,
    });
  };

  return [value as any, handleChange];
};

export default useSettingValue;
