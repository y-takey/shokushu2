// @flow
import * as React from "react";

import AppContext from "~/contexts/AppContext";
import {
  load,
  insertAll,
  update as updateMedia,
  remove as removeMedia,
  add as addMedia,
} from "~/datastore/mediaStore";

type Props = {
  children: any
};

const MediaContext: any = React.createContext({});

const MediaProvider = ({ children }: Props) => {
  const {
    comicDir,
    videoDir,
    selectedId,
    condition,
    sorter,
    pager,
  } = React.useContext(AppContext);
  const [media, setMedia] = React.useState([]);
  const [mediaCount, setMediaCount] = React.useState(0);
  const [currentMedia, setCurrentMedia] = React.useState(null);

  const getHomeDir = mediaType => (mediaType === "comic" ? comicDir : videoDir);

  const loadMedia = async () => {
    const [data, count] = await load(condition, sorter, pager);
    console.log("[sorter, pager]", sorter, pager, count);
    setMedia(data);
    setMediaCount(count);
  };

  React.useEffect(
    () => {
      if (comicDir || videoDir) loadMedia();
    },
    [comicDir, videoDir, condition, sorter, pager]
  );

  React.useEffect(
    () => {
      if (selectedId) {
        setCurrentMedia(media.find(({ _id }) => _id === selectedId));
      } else {
        setCurrentMedia(null);
      }
    },
    [media, selectedId]
  );

  const sync = async mediaType => {
    await insertAll(mediaType, getHomeDir(mediaType));
    loadMedia();
  };

  const update = async attrs => {
    if (!currentMedia) return;

    await updateMedia(selectedId, attrs, getHomeDir(currentMedia.mediaType));

    await loadMedia();
  };

  const add = async (mediaType, targetPath) => {
    await addMedia(mediaType, getHomeDir(mediaType), targetPath);
    await loadMedia();
  };

  const remove = async targetId => {
    await removeMedia(targetId);
    await loadMedia();
  };

  const value = { media, mediaCount, sync, update, remove, add, currentMedia };

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

export { MediaProvider };

export default MediaContext;
