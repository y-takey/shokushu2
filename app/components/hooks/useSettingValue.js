// @flow
import * as React from "react";

import AppContext from "~/contexts/AppContext";

const useSettingValue = (key: string) => {
  const { [key]: persistedValue, update } = React.useContext(AppContext);
  const [value, set] = React.useState(persistedValue);

  React.useEffect(
    () => {
      set(persistedValue);
    },
    [persistedValue]
  );

  const handleChange = (newValue: any) => {
    set(newValue);
    update({ [key]: newValue });
  };

  return [value, handleChange];
};

export default useSettingValue;
