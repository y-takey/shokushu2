import * as React from "react";

import { find, update } from "~/renderer/datastore/tagsStore";

type Props = {
  children: React.ReactNode;
};

type TagName = string;

type ContextType = {
  tags: TagName[];
  add: (names: TagName[]) => void;
};

const TagsContext = React.createContext<ContextType>(undefined);

export const TagsProvider = ({ children }: Props) => {
  const [tags, changeTags] = React.useState([]);

  const loadTags = async () => {
    await changeTags(await find());
  };

  React.useEffect(() => {
    loadTags();
  }, []);

  const add = React.useCallback(
    (values) => {
      // uniqueness & sort
      const newTags = Array.from(new Set([...tags, ...values].sort()));
      changeTags(newTags);
      update(newTags);
    },
    [tags]
  );

  const value = React.useMemo(() => ({ tags, add }), [tags, add]);

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
};

export const useTags = () => {
  const value = React.useContext(TagsContext);
  if (!value) throw new Error("TagsContext is undefined");

  return value;
};

export default TagsContext;
