// @flow
import * as React from "react";

import SettingContext from "~/contexts/SettingContext";
import { load, insertAll } from "~/datastore/mediaStore";
import { getDirs, getFiles } from "~/datastore/storage";

type Props = {
  children: any
};

const MediaContext: any = React.createContext({});

const MediaProvider = ({ children }: Props) => {
  const { comicDir, videoDir } = React.useContext(SettingContext);
  const [media, changeMedia] = React.useState([]);

  const loadMedia = async () => {
    const data = await load();
    changeMedia(data);
  };

  React.useEffect(() => {
    loadMedia();
  }, []);

  const sync = async mediaType => {
    if (mediaType === "comic") {
      await insertAll(mediaType, comicDir, getDirs(comicDir));
    } else {
      await insertAll(mediaType, videoDir, getFiles(videoDir));
    }

    loadMedia();
  };

  const value = { media, sync };

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

export { MediaProvider };

export default MediaContext;
