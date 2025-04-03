import * as React from "react";

import { find, update } from "~/renderer/datastore/tagCategoriesStore";

type Props = {
  children: React.ReactNode;
};

type Category = string;

type ContextType = {
  categories: Category[];
  add: (name: Category) => void;
  remove: (name: Category) => void;
};

const TagCategoriesContext = React.createContext<ContextType | undefined>(undefined);

export const TagCategoriesProvider = ({ children }: Props) => {
  const [categories, changeCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    const load = async () => {
      changeCategories(await find());
    };

    load();
  }, []);

  const add = React.useCallback(
    (name: Category) => {
      // uniqueness & sort
      const newCategories = Array.from(new Set([...categories, name].sort()));
      changeCategories(newCategories);
      update(newCategories);
    },
    [categories]
  );

  const remove = React.useCallback(
    (name: Category) => {
      const newCategories = categories.filter((tag) => tag !== name);
      changeCategories(newCategories);
      update(newCategories);
    },
    [categories]
  );

  const value = React.useMemo(() => ({ categories, add, remove }), [categories, add, remove]);

  return <TagCategoriesContext.Provider value={value}>{children}</TagCategoriesContext.Provider>;
};

export default TagCategoriesContext;
