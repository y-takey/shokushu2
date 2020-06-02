import * as React from "react";

import AppContext from "~/contexts/AppContext";
import SkeletonList from "~/components/list/SkeletonList";
import { AuthorsProvider } from "~/contexts/AuthorsContext";
import { TagsProvider } from "~/contexts/TagsContext";

import ListContainer from "./ListScreen";
import ViewerContainer from "./ViewerScreen";

const Content: React.FC = () => {
  const { initialized, mode } = React.useContext(AppContext);

  if (!initialized) return <SkeletonList />;

  return (
    <AuthorsProvider>
      <TagsProvider>{mode === "view" ? <ViewerContainer /> : <ListContainer />}</TagsProvider>
    </AuthorsProvider>
  );
};

export default Content;
