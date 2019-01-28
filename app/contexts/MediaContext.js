// @flow
import * as React from "react";

import AppContext from "~/contexts/AppContext";
import { load, insertAll, update as updateMedia } from "~/datastore/mediaStore";
import { getDirs, getFiles } from "~/datastore/storage";

type Props = {
  children: any
};

const MediaContext: any = React.createContext({});

const MediaProvider = ({ children }: Props) => {
  const { comicDir, videoDir, selectedId } = React.useContext(AppContext);
  const [media, changeMedia] = React.useState([]);
  const [currentMedia, changeCurrentMedia] = React.useState(null);

  const loadMedia = async () => {
    const data = await load();
    const dataWithPath = data.map(rec => ({
      ...rec,
      path: `${rec.mediaType === "comic" ? comicDir : videoDir}/${rec.title}`,
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
      if (selectedId) {
        changeCurrentMedia(media.find(({ _id }) => _id === selectedId));
      } else {
        changeCurrentMedia(null);
      }
    },
    [media, selectedId]
  );

  const sync = async mediaType => {
    if (mediaType === "comic") {
      await insertAll(mediaType, comicDir, getDirs(comicDir));
    } else {
      await insertAll(mediaType, videoDir, getFiles(videoDir));
    }

    loadMedia();
  };

  const update = async attrs => {
    await updateMedia(selectedId, attrs);
    await loadMedia();
  };

  const value = { media, sync, update, currentMedia };

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

export { MediaProvider };

export default MediaContext;
