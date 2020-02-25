import * as React from "react";
import sortBy from "lodash/sortBy";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { Media, Chapter } from "~/types";
import useInterval from "~/components/hooks/useInterval";
import openMediaFolder from "~/utils/openMediaFolder";
import { formatToday } from "~/utils/date";

import createChapters from "./createChapters";

type Props = {
  medium: Media;
  children: React.ReactNode;
};

type State = Media & {
  minPosition?: number;
  isChanged?: boolean;
};

type Action =
  | { type: "change_range"; payload: { min: number; max: number } }
  | { type: "update"; payload: Partial<Media> }
  | { type: "move_position"; payload: { position: number } }
  | { type: "prev_position"; payload: { offset: number } }
  | { type: "next_position"; payload: { offset: number } }
  | { type: "add_bookmark" }
  | { type: "prev_bookmark" }
  | { type: "next_bookmark" }
  | { type: "saved" };

const adjustPosition = (position: number, min: number, max: number): number => {
  if (position < min) return min;
  if (position > max) return max;

  return position;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "change_range": {
      const { min, max } = action.payload;
      return {
        ...state,
        currentPosition: state.currentPosition || min,
        size: max,
        minPosition: min,
        isChanged: true,
      };
    }
    case "update": {
      const nextState = { ...state, ...action.payload };
      nextState.currentPosition = nextState.currentPosition || state.minPosition;
      return nextState;
    }
    case "move_position":
      return {
        ...state,
        currentPosition: adjustPosition(action.payload.position, state.minPosition, state.size),
        isChanged: true,
      };
    case "prev_position":
    case "next_position":
      return {
        ...state,
        currentPosition: adjustPosition(state.currentPosition + action.payload.offset, state.minPosition, state.size),
        isChanged: true,
      };
    case "add_bookmark": {
      const { bookmarks, currentPosition } = state;
      const newBookmarks = bookmarks.includes(currentPosition)
        ? bookmarks.filter(bm => bm !== currentPosition)
        : sortBy([...bookmarks, currentPosition]);
      return { ...state, bookmarks: newBookmarks, isChanged: true };
    }
    case "prev_bookmark": {
      const { bookmarks, currentPosition } = state;
      const nextPosition = [...bookmarks].reverse().find(bm => bm < currentPosition);

      if (!nextPosition) return state;

      return {
        ...state,
        currentPosition: adjustPosition(nextPosition, state.minPosition, state.size),
        isChanged: true,
      };
    }
    case "next_bookmark": {
      const { bookmarks, currentPosition } = state;
      const nextPosition = bookmarks.find(bm => bm > currentPosition);

      if (!nextPosition) return state;

      return {
        ...state,
        currentPosition: adjustPosition(nextPosition, state.minPosition, state.size),
        isChanged: true,
      };
    }
    case "saved": {
      return { ...state, isChanged: false };
    }
    default:
      return state;
  }
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

type ContextType = State & {
  chapters: Chapter[];
  isFullScreen: boolean;
  isPlaying: boolean;
  isEditing: boolean;
  isShowActionBar: boolean;
  isShowChapters: boolean;
  toggleChapters: () => void;
  toggleFullScreen: () => void;
  togglePlaying: () => void;
  toggleStarred: () => void;
  toggleTodo: () => void;
  edit: () => void;
  editCancel: () => void;
  update: (attrs: Partial<Media>) => Promise<void>;
  remove: () => void;
  quit: () => Promise<void>;
  openFolder: () => void;
  setShowActionBar: (value: boolean) => void;
  loadedVideo: (length: number) => void;
  loadedComic: (pages: string[]) => void;
  movePosition: (value: number) => void;
  prevPosition: () => void;
  prevPositionHalf: () => void;
  nextPosition: () => void;
  nextPositionHalf: () => void;
  addBookmark: () => void;
  prevBookmark: () => void;
  nextBookmark: () => void;
};

const noop = () => {
  // do noting
};

const noopAsync = async () => {
  // do noting
};

const MediumContext = React.createContext<ContextType>({
  ...initialMedium,
  isChanged: false,
  chapters: [],
  isFullScreen: false,
  isPlaying: false,
  isEditing: false,
  isShowActionBar: true,
  isShowChapters: true,
  toggleChapters: noop,
  toggleFullScreen: noop,
  toggleStarred: noop,
  toggleTodo: noop,
  edit: noop,
  editCancel: noop,
  update: noopAsync,
  remove: noop,
  quit: noopAsync,
  openFolder: noop,
  setShowActionBar: noop,
  togglePlaying: noop,
  loadedVideo: noop,
  loadedComic: noop,
  movePosition: noop,
  prevPosition: noop,
  prevPositionHalf: noop,
  nextPosition: noop,
  nextPositionHalf: noop,
  addBookmark: noop,
  prevBookmark: noop,
  nextBookmark: noop,
});

const MediumProvider: React.FC<Props> = ({ medium, children }) => {
  const {
    autoFullscreen,
    update: updateApp,
    movingStep: { [medium.mediaType]: movingStep },
  } = React.useContext(AppContext);
  const { update: updateMedium, remove: removeMedium } = React.useContext(MediaContext);
  const [isFullScreen, setFullScreen] = React.useState(autoFullscreen);
  const [isEditing, setEditing] = React.useState(false);
  const [isPlaying, setPlaying] = React.useState(true);
  const [isShowActionBar, setShowActionBar] = React.useState(true);
  const [isShowChapters, setShowChapters] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, medium || initialMedium);
  const { _id: mediumId } = state;
  const [chapters, setChapters] = React.useState([]);
  const pages = React.useRef<string[]>([]);
  const movingStepHalf = Math.ceil(movingStep / 2);

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

  const edit = () => {
    setEditing(true);
  };

  const editCancel = () => {
    setEditing(false);
  };

  const update = async (attrs: Partial<Media>) => {
    dispatch({ type: "update", payload: attrs });
    await updateMedium(attrs, mediumId);
    setEditing(false);
  };

  const remove = () => {
    removeMedium(mediumId);
  };

  const toggleChapters = () => {
    setShowChapters(currentVal => !currentVal);
  };

  const toggleFullScreen = (event?: any) => {
    if (event) event.preventDefault();

    setFullScreen(currentVal => !currentVal);
  };

  const togglePlaying = () => {
    setPlaying(currentVal => !currentVal);
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
    pages.current = paramPages;

    dispatch({
      type: "change_range",
      payload: { min: 1, max: paramPages.length },
    });

    setChapters(createChapters(paramPages));
  };

  const movePosition = (position: number) => {
    dispatch({ type: "move_position", payload: { position } });
  };
  const prevPosition = () => {
    dispatch({ type: "prev_position", payload: { offset: movingStep * -1 } });
  };
  const prevPositionHalf = () => {
    dispatch({
      type: "prev_position",
      payload: { offset: movingStepHalf * -1 },
    });
  };
  const nextPosition = () => {
    dispatch({ type: "next_position", payload: { offset: movingStep } });
  };
  const nextPositionHalf = () => {
    dispatch({ type: "next_position", payload: { offset: movingStepHalf } });
  };
  const addBookmark = () => {
    dispatch({ type: "add_bookmark" });
  };
  const prevBookmark = () => {
    dispatch({ type: "prev_bookmark" });
  };
  const nextBookmark = () => {
    dispatch({ type: "next_bookmark" });
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
    chapters,
    isFullScreen,
    isEditing,
    isPlaying,
    isShowActionBar,
    isShowChapters,
    toggleChapters,
    edit,
    editCancel,
    update,
    remove,
    toggleFullScreen,
    toggleStarred,
    toggleTodo,
    quit,
    openFolder,
    setShowActionBar,
    loadedVideo,
    loadedComic,
    movePosition,
    togglePlaying,
    prevPosition,
    prevPositionHalf,
    nextPosition,
    nextPositionHalf,
    addBookmark,
    prevBookmark,
    nextBookmark,
  };

  return <MediumContext.Provider value={value}>{children}</MediumContext.Provider>;
};

export { MediumProvider };

export default MediumContext;
