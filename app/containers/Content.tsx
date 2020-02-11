import * as React from "react";

import AppContext from "~/contexts/AppContext";
import SkeletonList from "~/components/list/SkeletonList";
import { AuthorsProvider } from "~/contexts/AuthorsContext";
import { TagsProvider } from "~/contexts/TagsContext";
import { MediaProvider } from "~/contexts/MediaContext";

import DrawerManager from "./DrawerManager";
import ListContainer from "./ListContainer";
import ViewerContainer from "./ViewerContainer";

const Content = () => {
  const { initialized, mode } = React.useContext(AppContext);

  return (
    <AuthorsProvider>
      <TagsProvider>
        {initialized ? (
          <MediaProvider>
            {mode === "view" ? <ViewerContainer /> : <ListContainer />}
            <DrawerManager />
          </MediaProvider>
        ) : (
          <SkeletonList />
        )}
      </TagsProvider>
    </AuthorsProvider>
  );
};

export default Content;
