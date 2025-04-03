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

const TagGroupsContext = React.createContext<ContextType | undefined>(undefined);

export const TagGroupsProvider = ({ children }: Props) => {
  const [tagGroups, setGroups] = React.useState<TagGroup[]>([]);

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

export default TagGroupsContext;
