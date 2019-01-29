// @flow
import * as React from "react";

import AppContext from "~/contexts/AppContext";
import { load, insertAll, update as updateMedia } from "~/datastore/mediaStore";
import { getDirs, getFiles, move } from "~/datastore/storage";

type Props = {
  children: any
};

const MediaContext: any = React.createContext({});

const MediaProvider = ({ children }: Props) => {
  const { comicDir, videoDir, selectedId } = React.useContext(AppContext);
  const [media, changeMedia] = React.useState([]);
  const [currentMedia, changeCurrentMedia] = React.useState(null);

  const loadMedia = async () => {
    changeMedia(await load());
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

  const shouldRename = ({ title, authors }) => {
    if (!currentMedia) return false;
    if (!title && !authors) return false;

    return (
      title !== currentMedia.title || authors[0] !== currentMedia.authors[0]
    );
  };

  const update = async attrs => {
    if (!currentMedia) return;

    if (shouldRename(attrs)) {
      const newPath = move(
        currentMedia.path,
        currentMedia.mediaType === "comic" ? comicDir : videoDir,
        (attrs.authors || currentMedia.authors)[0],
        `${attrs.title || currentMedia.title}${currentMedia.extension}`
      );

      await updateMedia(selectedId, { ...attrs, path: newPath });
    } else {
      await updateMedia(selectedId, attrs);
    }

    await loadMedia();
  };

  const value = { media, sync, update, currentMedia };

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

export { MediaProvider };

export default MediaContext;
