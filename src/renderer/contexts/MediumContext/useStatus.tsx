import * as React from "react";

import AppContext from "~/renderer/contexts/AppContext";

export type StatusContextType = {
  isFullScreen: boolean;
  isPlaying: boolean;
  isEditing: boolean;
  isShowActionBar: boolean;
  toggleFullScreen: () => void;
  togglePlaying: () => void;
  edit: () => void;
  editCancel: () => void;
  setShowActionBar: (value: boolean) => void;
};

const noop = () => {};

export const initialStatusContext: StatusContextType = {
  isEditing: false,
  isFullScreen: false,
  isPlaying: false,
  isShowActionBar: true,
  edit: noop,
  editCancel: noop,
  toggleFullScreen: noop,
  togglePlaying: noop,
  setShowActionBar: noop,
};

const useStatus = (): StatusContextType => {
  const { autoFullscreen } = React.useContext(AppContext);
  const [isFullScreen, setFullScreen] = React.useState(autoFullscreen);
  const [isEditing, setEditing] = React.useState(false);
  const [isPlaying, setPlaying] = React.useState(true);
  const [isShowActionBar, setShowActionBar] = React.useState(true);

  const edit = () => {
    setEditing(true);
  };

  const editCancel = () => {
    setEditing(false);
  };

  const toggleFullScreen = (event?: any) => {
    if (event) {
      event.preventDefault();

      if (event.key === "Escape" && !isFullScreen) return;
    }

    setFullScreen((currentVal) => !currentVal);
  };

  const togglePlaying = () => {
    setPlaying((currentVal) => !currentVal);
  };

  return {
    isEditing,
    isFullScreen,
    isPlaying,
    isShowActionBar,
    edit,
    editCancel,
    toggleFullScreen,
    togglePlaying,
    setShowActionBar,
  };
};

export default useStatus;
