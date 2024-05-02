import * as React from "react";

import AppContext from "~/renderer/contexts/AppContext";
import { update as updateMedium, remove as removeMedium } from "~/renderer/datastore/mediaStore";
import ListContext from "~/renderer/screens/ListScreen/ListContext";
import useInterval from "~/renderer/components/hooks/useInterval";
import { openMediaFolder, copyMediaFolderPath } from "~/renderer/utils/openMediaFolder";
import { formatToday } from "~/renderer/utils/date";
import getFileName from "~/renderer/utils/getFileName";
import { Media } from "~/types";

import { State } from "./interface";
import reducer from "./reducer";
import useStatus, { StatusContextType, initialStatusContext } from "./useStatus";
import usePosition, { PositionContextType, initialPositionContext } from "./usePosition";
import useBookmark, { BookmarkContextType, initialBookmarkContext } from "./useBookmark";
import useChapters, { ChaptersContextType, initialChaptersContext } from "./useChapters";

type Props = {
  medium: Media;
  children: React.ReactNode;
};

const { getFiles } = window.shokushu2API.storage;

const initialMedium: Media = {
  _id: "",
  docType: "media",
  mediaType: "comic",
  title: "",
  size: 0,
  currentPosition: 0,
  fav: 0,
  viewedAt: "",
  viewedCount: 0,
  registeredAt: "",
  authors: [],
  tags: [],
  bookmarks: [],
  path: "",
  thumbnail: null,
  isStarred: false,
  isTodo: false,
};

type ContextType = State &
  StatusContextType &
  PositionContextType &
  BookmarkContextType &
  ChaptersContextType & {
    pages: string[];
    loadComic: () => void;
    toggleStarred: () => void;
    toggleTodo: () => void;
    update: (attrs: Partial<Media>) => Promise<void>;
    remove: () => void;
    quit: () => Promise<void>;
    openFolder: () => void;
    copyDir: () => void;
    loadedVideo: (length: number) => void;
  };

const noop = () => {};

const noopAsync = async () => {};

const MediumContext = React.createContext<ContextType>({
  ...initialMedium,
  ...initialStatusContext,
  ...initialPositionContext,
  ...initialBookmarkContext,
  ...initialChaptersContext,
  isChanged: false,
  pages: [],
  loadComic: noop,
  toggleStarred: noop,
  toggleTodo: noop,
  update: noopAsync,
  remove: noop,
  quit: noopAsync,
  openFolder: noop,
  copyDir: noop,
  loadedVideo: noop,
});

const MediumProvider: React.FC<Props> = ({ medium, children }) => {
  const { update: updateApp, getHomeDir, mode } = React.useContext(AppContext);
  const { loadMedia } = React.useContext(ListContext);
  const [state, dispatch] = React.useReducer(reducer, medium || initialMedium);
  const [pages, setPages] = React.useState([]);
  const { _id: mediumId } = state;
  const statusContext = useStatus();
  const positionContext = usePosition(medium.mediaType, dispatch);
  const bookmarkContext = useBookmark(dispatch);
  const { updateChapters, ...chaptersContext } = useChapters(state.currentPosition, dispatch);

  const saveStatus = () => {
    if (!state.isChanged) return;

    const { currentPosition, bookmarks, size } = state;
    update({ currentPosition, bookmarks, size, viewedAt: formatToday() });
  };

  React.useEffect(() => () => saveStatus(), []);

  useInterval(() => {
    saveStatus();
    dispatch({ type: "saved" });
  }, 3000);

  const update = async (attrs: Partial<Media>) => {
    dispatch({ type: "update", payload: attrs });
    await updateMedium(mediumId, attrs, getHomeDir(medium.mediaType));
    statusContext.editCancel();
    if (mode === "list") loadMedia();
  };

  const remove = async () => {
    await removeMedium(mediumId);
    loadMedia();
  };

  const toggleStarred = () => {
    update({ isStarred: !state.isStarred });
  };

  const toggleTodo = () => {
    update({ isTodo: !state.isTodo });
  };

  const openFolder = () => {
    openMediaFolder(state);
  };

  const copyDir = () => {
    copyMediaFolderPath(state);
  };

  const loadedVideo = (length: number) => {
    dispatch({ type: "change_range", payload: { min: 0, max: length } });
  };

  const loadComic = () => {
    const fileNames = getFiles(state.path, "comic");
    const filePaths = fileNames.map(({ path }) => path);
    setPages(filePaths);

    dispatch({ type: "change_range", payload: { min: 1, max: filePaths.length } });
    update({ thumbnail: getFileName(filePaths[0]) });

    updateChapters(filePaths);
  };

  const quit = async () => {
    const progress = state.size ? state.currentPosition / state.size : 0;

    // when progress is over 99%, back to top
    if (progress > 0.99) {
      await update({
        viewedCount: state.viewedCount + 1,
        viewedAt: formatToday(),
        currentPosition: null,
        isTodo: false,
      });
    }

    updateApp({ mode: "list" });
  };

  const value = React.useMemo(
    () => ({
      ...state,
      ...statusContext,
      ...positionContext,
      ...bookmarkContext,
      ...chaptersContext,
      pages,
      update,
      remove,
      toggleStarred,
      toggleTodo,
      quit,
      openFolder,
      copyDir,
      loadedVideo,
      loadComic,
    }),
    [
      state,
      statusContext,
      positionContext,
      bookmarkContext,
      chaptersContext,
      pages,
      update,
      remove,
      toggleStarred,
      toggleTodo,
      quit,
      openFolder,
      loadedVideo,
      loadComic,
    ]
  );

  return <MediumContext.Provider value={value}>{children}</MediumContext.Provider>;
};

export { MediumProvider };

export default MediumContext;
