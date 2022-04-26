import * as React from "react";

import MediumContext from "~/renderer/contexts/MediumContext";
import ActionBar from "~/renderer/screens/ViewerScreen/ActionBar";
import getFileName from "~/renderer/utils/getFileName";

import Panel from "./Panel";

type Props = unknown;

const ComicViewer: React.FC<Props> = () => {
  const { path: dirPath, currentPosition, pages, loadComic } = React.useContext(MediumContext);

  React.useEffect(() => {
    loadComic();
  }, [dirPath]);

  const extendItems = [
    {
      key: "filename",
      content: getFileName(pages[currentPosition - 1]),
      width: 100,
    },
  ];

  return (
    <>
      <Panel
        filePaths={{
          left: pages[currentPosition],
          right: pages[currentPosition - 1],
        }}
      />
      <ActionBar extendItems={extendItems} />
    </>
  );
};

export default ComicViewer;
