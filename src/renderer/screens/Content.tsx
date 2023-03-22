import * as React from "react";

import AppContext from "~/renderer/contexts/AppContext";
import SkeletonList from "~/renderer/components/SkeletonList";
import { AuthorsProvider } from "~/renderer/contexts/AuthorsContext";
import { TagsProvider } from "~/renderer/contexts/TagsContext";
import { TagCategoriesProvider } from "~/renderer/contexts/TagCategoriesContext";
import { TagGroupsProvider } from "~/renderer/contexts/TagGroupsContext";

import ListContainer from "./ListScreen";
import ViewerContainer from "./ViewerScreen";

const Content: React.FC = () => {
  const { initialized, mode } = React.useContext(AppContext);

  if (!initialized) return <SkeletonList />;

  return (
    <AuthorsProvider>
      <TagCategoriesProvider>
        <TagGroupsProvider>
          <TagsProvider>{mode === "view" ? <ViewerContainer /> : <ListContainer />}</TagsProvider>
        </TagGroupsProvider>
      </TagCategoriesProvider>
    </AuthorsProvider>
  );
};

export default Content;
