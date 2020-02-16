import * as React from "react";

import MediumContext from "~/contexts/MediumContext";
import { getFiles } from "~/datastore/storage";
import ActionBar from "~/components/viewer/ActionBar";

import Panel from "./Panel";

type Props = {};

const ComicViewer: React.FC<Props> = () => {
  const { path: dirPath, currentPosition, loadedComic } = React.useContext(
    MediumContext
  );
  const [pages, setPages] = React.useState([]);

  React.useEffect(() => {
    const fileNames = getFiles(dirPath, "comic");
    const filePaths = fileNames.map(({ path }) => path);
    setPages(filePaths);
    loadedComic(filePaths);
  }, [dirPath]);

  return (
    <>
      <Panel
        filePaths={{
          left: pages[currentPosition],
          right: pages[currentPosition - 1],
        }}
      />
      <ActionBar />
    </>
  );
};

export default ComicViewer;
