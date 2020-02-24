import * as React from "react";

import AppContext from "~/contexts/AppContext";
import { load, insertAll, update as updateMedia, remove as removeMedia, add as addMedia } from "~/datastore/mediaStore";
import { Media, MediaType } from "~/types";

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  media: Media[];
  mediaCount: number;
  sync: (mediaType: MediaType) => Promise<void>;
  update: (attrs: Partial<Media>, targetId?: string) => Promise<void>;
  remove: (targetId: string) => void;
  add: (mediaType: MediaType, targetPath: string) => void;
  currentMedia: Media | null;
};

const noop = async () => {
  // do noting
};

const MediaContext = React.createContext<ContextType>({
  media: [],
  mediaCount: 0,
  sync: noop,
  update: noop,
  remove: noop,
  add: noop,
  currentMedia: null,
});

const MediaProvider: React.FC<Props> = ({ children }) => {
  const { comicDir, videoDir, selectedId, condition, sorter, pager } = React.useContext(AppContext);
  const [media, setMedia] = React.useState<Media[]>([]);
  const [mediaCount, setMediaCount] = React.useState(0);
  const [currentMedia, setCurrentMedia] = React.useState<Media>(null);

  const findMedium = mediumId => media.find(({ _id }) => _id === mediumId);

  const getHomeDir = mediaType => (mediaType === "comic" ? comicDir : videoDir);

  const loadMedia = async () => {
    const [data, count] = await load(condition, sorter, pager);
    setMedia(data);
    setMediaCount(count as number);
  };

  React.useEffect(() => {
    if (comicDir || videoDir) loadMedia();
  }, [comicDir, videoDir, condition, sorter, pager]);

  React.useEffect(() => {
    if (selectedId) {
      setCurrentMedia(findMedium(selectedId));
    } else {
      setCurrentMedia(null);
    }
  }, [media, selectedId]);

  const sync = async mediaType => {
    await insertAll(mediaType, getHomeDir(mediaType));
    loadMedia();
  };

  const update = async (attrs: Partial<Media>, targetId = "") => {
    const mediumId = targetId || selectedId;
    const medium = mediumId && findMedium(mediumId);
    if (!medium) return;

    await updateMedia(mediumId, attrs, getHomeDir(medium.mediaType));

    await loadMedia();
  };

  const add = async (mediaType, targetPath) => {
    await addMedia(mediaType, getHomeDir(mediaType), targetPath);
    await loadMedia();
  };

  const remove = async (targetId: string) => {
    await removeMedia(targetId);
    await loadMedia();
  };

  const value = {
    media,
    mediaCount,
    sync,
    update,
    remove,
    add,
    currentMedia,
  };

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

export { MediaProvider };

export default MediaContext;
