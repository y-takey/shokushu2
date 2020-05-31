import * as React from "react";

import MediumContext from "~/contexts/MediumContext";
import { getFiles } from "~/datastore/storage";
import ActionBar from "~/components/viewer/ActionBar";
import getFileName from "~/utils/getFileName";

import Panel from "./Panel";

type Props = unknown;

const ComicViewer: React.FC<Props> = () => {
  const { path: dirPath, currentPosition, loadedComic } = React.useContext(MediumContext);
  const [pages, setPages] = React.useState([]);

  React.useEffect(() => {
    const fileNames = getFiles(dirPath, "comic");
    const filePaths = fileNames.map(({ path }) => path);
    setPages(filePaths);
    loadedComic(filePaths);
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
