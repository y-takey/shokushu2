import * as React from "react";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { Media } from "~/types";
import useInterval from "~/components/hooks/useInterval";
import openMediaFolder from "~/utils/openMediaFolder";
import { formatToday } from "~/utils/date";
import getFileName from "~/utils/getFileName";

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
    toggleStarred: () => void;
    toggleTodo: () => void;
    update: (attrs: Partial<Media>) => Promise<void>;
    remove: () => void;
    quit: () => Promise<void>;
    openFolder: () => void;
    loadedVideo: (length: number) => void;
    loadedComic: (pages: string[]) => void;
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
  toggleStarred: noop,
  toggleTodo: noop,
  update: noopAsync,
  remove: noop,
  quit: noopAsync,
  openFolder: noop,
  loadedVideo: noop,
  loadedComic: noop,
});

const MediumProvider: React.FC<Props> = ({ medium, children }) => {
  const { update: updateApp } = React.useContext(AppContext);
  const { update: updateMedium, remove: removeMedium } = React.useContext(MediaContext);
  const [state, dispatch] = React.useReducer(reducer, medium || initialMedium);
  const { _id: mediumId } = state;
  const statusContext = useStatus();
  const positionContext = usePosition(medium.mediaType, dispatch);
  const bookmarkContext = useBookmark(dispatch);
  const { updateChapters, ...chaptersContext } = useChapters(state.currentPosition, dispatch);

  React.useEffect(() => {
    if (medium) dispatch({ type: "update", payload: medium });
  }, [medium]);

  const saveStatus = () => {
    if (!state.isChanged) return;

    const { currentPosition, bookmarks, size } = state;
    updateMedium({ currentPosition, bookmarks, size, viewedAt: formatToday() }, mediumId);
  };

  React.useEffect(() => {
    return saveStatus;
  }, []);

  useInterval(() => {
    saveStatus();
    dispatch({ type: "saved" });
  }, 3000);

  const update = async (attrs: Partial<Media>) => {
    dispatch({ type: "update", payload: attrs });
    await updateMedium(attrs, mediumId);
    statusContext.editCancel();
  };

  const remove = () => {
    removeMedium(mediumId);
  };

  const toggleStarred = () => {
    const attrs = { isStarred: !state.isStarred };
    dispatch({ type: "update", payload: attrs });
    updateMedium(attrs, mediumId);
  };

  const toggleTodo = () => {
    const attrs = { isTodo: !state.isTodo };
    dispatch({ type: "update", payload: attrs });
    updateMedium(attrs, mediumId);
  };

  const openFolder = () => {
    openMediaFolder(state);
  };

  const loadedVideo = (length: number) => {
    dispatch({ type: "change_range", payload: { min: 0, max: length } });
  };

  const loadedComic = (paramPages: string[]) => {
    dispatch({
      type: "change_range",
      payload: { min: 1, max: paramPages.length },
    });
    updateMedium({ thumbnail: getFileName(paramPages[0]) }, mediumId);

    updateChapters(paramPages);
  };

  const quit = async () => {
    const progress = state.size ? state.currentPosition / state.size : 0;

    // when progress is over 99%, back to top
    if (progress > 0.99) {
      await updateMedium(
        {
          viewedCount: state.viewedCount + 1,
          viewedAt: formatToday(),
          currentPosition: null,
          isTodo: false,
        },
        mediumId
      );
    }

    updateApp({ mode: "list", selectedId: null });
  };

  const value = {
    ...state,
    ...statusContext,
    ...positionContext,
    ...bookmarkContext,
    ...chaptersContext,
    update,
    remove,
    toggleStarred,
    toggleTodo,
    quit,
    openFolder,
    loadedVideo,
    loadedComic,
  };

  return <MediumContext.Provider value={value}>{children}</MediumContext.Provider>;
};

export { MediumProvider };

export default MediumContext;
