import * as React from "react";

import { find, update } from "~/renderer/datastore/authorsStore";

type Props = {
  children: React.ReactNode;
};

type AuthorName = string;

type ContextType = {
  authors: AuthorName[];
  add: (names: AuthorName[]) => void;
};

const AuthorsContext = React.createContext<ContextType | undefined>(undefined);

export const AuthorsProvider: React.FC<Props> = ({ children }) => {
  const [authors, changeAuthors] = React.useState<AuthorName[]>([]);

  const loadAuthors = async () => {
    await changeAuthors(await find());
  };

  React.useEffect(() => {
    loadAuthors();
  }, []);

  const add = React.useCallback(
    (values) => {
      // uniqueness & sort
      const newAuthors = Array.from(new Set([...authors, ...values].sort()));
      changeAuthors(newAuthors);
      update(newAuthors);
    },
    [authors]
  );

  const value = React.useMemo(() => ({ authors, add }), [authors, add]);

  return <AuthorsContext.Provider value={value}>{children}</AuthorsContext.Provider>;
};

export default AuthorsContext;
