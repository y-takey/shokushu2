// @flow
import * as React from 'react';

type Props = {
  children: any
};

const AppContext: any = React.createContext({});

const AppProvider = ({ children }: Props) => {
  const [mode, changeMode] = React.useState('');

  return (
    <AppContext.Provider value={{ mode, changeMode }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
