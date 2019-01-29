// @flow
import * as React from "react";

import { find, update } from "~/datastore/authorsStore";

type Props = {
  children: any
};

const AuthorsContext: any = React.createContext({});

const AuthorsProvider = ({ children }: Props) => {
  const [authors, changeAuthors] = React.useState([]);

  const loadAuthors = async () => {
    await changeAuthors(await find());
  };

  React.useEffect(() => {
    loadAuthors();
  }, []);

  const add = values => {
    // uniqueness & sort
    const newAuthors = Array.from(new Set([...authors, ...values].sort()));
    changeAuthors(newAuthors);
    update(newAuthors);
  };

  const value = { authors, add };

  return (
    <AuthorsContext.Provider value={value}>{children}</AuthorsContext.Provider>
  );
};

export { AuthorsProvider };

export default AuthorsContext;
