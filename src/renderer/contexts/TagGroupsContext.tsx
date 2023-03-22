import * as React from "react";

import { find, update as updateStore } from "~/renderer/datastore/tagGroupsStore";
import { TagGroup } from "~/types";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  tagGroups: TagGroup[];
  update: (newTagGroups: TagGroup[]) => void;
};

const TagGroupsContext = React.createContext<ContextType>(undefined);

export const TagGroupsProvider = ({ children }: Props) => {
  const [tagGroups, setGroups] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      setGroups(await find());
    };

    load();
  }, []);

  const update = React.useCallback((newTagGroups: TagGroup[]) => {
    setGroups(newTagGroups);
    updateStore(newTagGroups);
  }, []);

  const value = React.useMemo(() => ({ tagGroups, update }), [tagGroups, update]);

  return <TagGroupsContext.Provider value={value}>{children}</TagGroupsContext.Provider>;
};

export const useTagGroups = () => {
  const value = React.useContext(TagGroupsContext);
  if (!value) throw new Error("TagGroupsContext is undefined");

  return value;
};

export default TagGroupsContext;
