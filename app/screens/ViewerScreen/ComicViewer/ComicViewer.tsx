import * as React from "react";

import MediumContext from "~/contexts/MediumContext";
import ActionBar from "~/screens/ViewerScreen/ActionBar";
import getFileName from "~/utils/getFileName";

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
