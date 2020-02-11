import * as React from "react";

import AppContext from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { Media } from "~/types";

type Props = {
  medium: Media;
  children: React.ReactNode;
};

type State = Media;

type Action =
  | { type: "load"; payload: Media }
  | { type: "update"; payload: Partial<Media> }
  | { type: "prev_position" }
  | { type: "next_position" }
  | { type: "move_position"; payload: { position: number } }
  | { type: "prev_bookmark" }
  | { type: "next_bookmark" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "load":
      return { ...action.payload };
    case "update":
    case "prev_position":
    case "next_position":
    case "move_position":
    case "prev_bookmark":
    case "next_bookmark": {
      return state;
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
};

type ContextType = State & {
  isFullScreen: boolean;
  isPlaying: boolean;
  isEditing: boolean;
  toggleFullScreen: () => void;
  edit: () => void;
  editCancel: () => void;
  update: (attrs: Partial<Media>) => void;
  quit: () => void;
};

const noop = () => {
  // do noting
};

const MediumContext = React.createContext<ContextType>({
  ...initialMedium,
  isFullScreen: false,
  isPlaying: false,
  isEditing: false,
  toggleFullScreen: noop,
  edit: noop,
  editCancel: noop,
  update: noop,
  quit: noop,
});

const MediumProvider: React.FC<Props> = ({ medium, children }) => {
  const { autoFullscreen, update: updateApp } = React.useContext(AppContext);
  const { update: updateMedium } = React.useContext(MediaContext);
  const [isFullScreen, setFullScreen] = React.useState(autoFullscreen);
  const [isEditing, setEditing] = React.useState(false);
  const [isPlaying, setPlaying] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, medium);

  React.useEffect(() => {
    dispatch({ type: "load", payload: medium });
  }, [medium]);

  const edit = () => {
    setEditing(true);
  };

  const editCancel = () => {
    setEditing(false);
  };

  const update = () => {
    // TODO: save attrs
    setEditing(false);
  };

  const toggleFullScreen = () => {
    setFullScreen(currentVal => !currentVal);
  };

  const quit = () => {
    updateApp({ mode: "list", selectedId: null });
  };

  const value = {
    ...state,
    isFullScreen,
    isEditing,
    isPlaying,
    edit,
    editCancel,
    update,
    toggleFullScreen,
    quit,
  };

  return (
    <MediumContext.Provider value={value}>{children}</MediumContext.Provider>
  );
};

export { MediumProvider };

export default MediumContext;
