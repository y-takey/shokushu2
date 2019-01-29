// @flow
import * as React from "react";

import { find, update } from "~/datastore/tagsStore";

type Props = {
  children: any
};

const TagsContext: any = React.createContext({});

const TagsProvider = ({ children }: Props) => {
  const [tags, changeTags] = React.useState([]);

  const loadTags = async () => {
    await changeTags(await find());
  };

  React.useEffect(() => {
    loadTags();
  }, []);

  const add = values => {
    // uniqueness & sort
    const newTags = Array.from(new Set([...tags, ...values].sort()));
    changeTags(newTags);
    update(newTags);
  };

  const value = { tags, add };

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
};

export { TagsProvider };

export default TagsContext;
