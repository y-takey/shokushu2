// @flow
import * as React from "react";

import AppContext from "~/contexts/AppContext";
import SettingContext from "~/contexts/SettingContext";
import { load, insertAll } from "~/datastore/mediaStore";
import { getDirs, getFiles } from "~/datastore/storage";

type Props = {
  children: any
};

const MediaContext: any = React.createContext({});

const MediaProvider = ({ children }: Props) => {
  const { viewId } = React.useContext(AppContext);
  const { comicDir, videoDir } = React.useContext(SettingContext);
  const [media, changeMedia] = React.useState([]);
  const [currentMedia, changeCurrentMedia] = React.useState(null);

  const loadMedia = async () => {
    const data = await load();
    const dataWithPath = data.map(rec => ({
      ...rec,
      path: `file://${rec.mediaType === "comic" ? comicDir : videoDir}/${
        rec.title
      }`,
    }));
    changeMedia(dataWithPath);
  };

  React.useEffect(
    () => {
      if (comicDir || videoDir) loadMedia();
    },
    [comicDir, videoDir]
  );
  React.useEffect(
    () => {
      if (viewId) {
        changeCurrentMedia(media.find(({ _id }) => _id === viewId));
      } else {
        changeCurrentMedia(null);
      }
    },
    [viewId]
  );

  const sync = async mediaType => {
    if (mediaType === "comic") {
      await insertAll(mediaType, comicDir, getDirs(comicDir));
    } else {
      await insertAll(mediaType, videoDir, getFiles(videoDir));
    }

    loadMedia();
  };

  const value = { media, sync, currentMedia };

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

export { MediaProvider };

export default MediaContext;
