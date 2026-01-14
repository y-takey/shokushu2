import * as React from "react";
import { message } from "antd";

import AppContext, { initialCondition, initialPager, initialSorter } from "~/renderer/contexts/AppContext";
import { load, insertAll, add as addMedia } from "~/renderer/datastore/mediaStore";
import { MediaType, Media, Condition, Pager, Sorter } from "~/types";

type Props = {
  children: React.ReactNode;
};

type State = {
  media: Media[];
  totalCount: number;
  condition: Condition;
  pager: Pager;
  sorter: Sorter;
  rowIndex: number;
};

type Action =
  | { type: "loaded_media"; payload: Pick<State, "media" | "totalCount" | "rowIndex"> }
  | { type: "change_condition"; payload: Partial<Condition> }
  | { type: "change_sorter"; payload: Sorter }
  | { type: "change_pager"; payload: Pager }
  | { type: "next_page" }
  | { type: "prev_page" }
  | { type: "move_row"; payload: { rowIndex: number } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "loaded_media":
      return { ...state, ...action.payload };
    case "change_condition":
      return {
        ...state,
        condition: { ...state.condition, ...action.payload },
        pager: { ...state.pager, current: 1 },
        rowIndex: 0,
      };
    case "change_sorter":
      return { ...state, sorter: action.payload };
    case "change_pager":
      return { ...state, pager: action.payload, rowIndex: 0 };
    case "next_page": {
      const { size, current } = state.pager;
      const maxPage = Math.ceil(state.totalCount / size);
      if (current >= maxPage) return state;
      return { ...state, pager: { size, current: current + 1 }, rowIndex: 0 };
    }
    case "prev_page": {
      const { size, current } = state.pager;
      if (current <= 1) return state;
      return { ...state, pager: { size, current: current - 1 }, rowIndex: 0 };
    }
    case "move_row": {
      const { rowIndex } = action.payload;
      const { media, rowIndex: currentRowIndex } = state;
      let nextRowIndex = rowIndex;
      if (nextRowIndex > media.length - 1) nextRowIndex = media.length - 1;
      if (nextRowIndex < 0) nextRowIndex = 0;

      if (nextRowIndex === currentRowIndex) return state;

      return { ...state, rowIndex: nextRowIndex };
    }
    default:
      return state;
  }
};

type ItemEvent = null | "view" | "edit" | "todo" | "star" | "chapter" | "trimer" | "open" | "dir";

type ContextType = State & {
  isAuthorFilter: boolean;
  itemEvent: ItemEvent;
  setItemEvent: (itemEvent: ItemEvent) => void;
  loadMedia: () => Promise<void>;
  syncAll: () => Promise<void>;
  add: (mediaType: MediaType, targetPath: string) => Promise<void>;
  isSelected: (mediumId: string) => boolean;
  toggleAuthorFilter: () => void;
  filterAuthor: (authors: string[]) => void;
  filterClear: () => void;
  filterTodo: () => void;
  filterStarred: () => void;
  changeCondition: (condition: Partial<Condition>) => void;
  changeSorter: (sorter: Sorter) => void;
  changePager: (pager: Pager) => void;
  nextPage: () => void;
  prevPage: () => void;
  nextRow: () => void;
  prevRow: () => void;
  showSearchForm: () => void;
  showSettingForm: () => void;
  showTagsForm: () => void;
};

const asyncNoop = async () => {
  // do noting
};

const noop = () => {
  // do noting
};

const ListContext = React.createContext<ContextType>({
  media: [],
  totalCount: 0,
  condition: initialCondition,
  pager: initialPager,
  sorter: initialSorter,
  rowIndex: 0,
  isAuthorFilter: false,
  itemEvent: null,
  setItemEvent: noop,
  loadMedia: asyncNoop,
  syncAll: asyncNoop,
  add: asyncNoop,
  isSelected: () => false,
  toggleAuthorFilter: noop,
  filterAuthor: noop,
  filterClear: noop,
  filterTodo: noop,
  filterStarred: noop,
  changeCondition: noop,
  changeSorter: noop,
  changePager: noop,
  nextPage: noop,
  prevPage: noop,
  nextRow: noop,
  prevRow: noop,
  showSearchForm: noop,
  showSettingForm: noop,
  showTagsForm: noop,
});

const ListProvider: React.FC<Props> = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { condition, sorter, pager, update, getHomeDir, selectedId } = React.useContext(AppContext);
  const [isAuthorFilter, setAuthorFilter] = React.useState(false);
  const [itemEvent, setItemEvent] = React.useState<ItemEvent>(null);
  const [state, dispatch] = React.useReducer(reducer, {
    media: [],
    totalCount: 0,
    condition,
    sorter,
    pager,
    rowIndex: -1,
  });

  const loadMedia = React.useCallback(async () => {
    const [data, count] = await load(state.condition, state.sorter, state.pager);
    const rowIndex = selectedId ? data.findIndex(({ _id: mediumId }) => mediumId === selectedId) : 0;

    dispatch({
      type: "loaded_media",
      payload: { media: data, totalCount: count as number, rowIndex },
    });
  }, [selectedId, state]);

  React.useEffect(() => {
    loadMedia();
    update({ condition: state.condition, sorter: state.sorter, pager: state.pager });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.condition, state.sorter, state.pager]);

  React.useEffect(() => {
    if (state.rowIndex < 0) return;

    const { _id: mediumId } = state.media[state.rowIndex] || { _id: undefined };

    if (mediumId !== selectedId) {
      update({ selectedId: mediumId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.rowIndex]);

  const syncAll = React.useCallback(async () => {
    await insertAll("video", getHomeDir("video")!);
    await insertAll("comic", getHomeDir("comic")!);
    loadMedia();
    messageApi.success("synced!", 1);
  }, [getHomeDir, loadMedia, messageApi]);

  const add = React.useCallback(
    async (mediaType, targetPath) => {
      await addMedia(mediaType, getHomeDir(mediaType)!, targetPath);
      await loadMedia();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getHomeDir, loadMedia, addMedia]
  );

  const modeOperations = React.useMemo(
    () => ({
      showSearchForm: () => {
        update({ mode: "search" });
      },
      showSettingForm: () => {
        update({ mode: "setting" });
      },
      showTagsForm: () => {
        update({ mode: "tags" });
      },
      toggleAuthorFilter: () => {
        setAuthorFilter((val) => !val);
        update({ mode: "list" });
      },
    }),
    [update]
  );

  const isSelected = React.useCallback((mediumId) => mediumId === selectedId, [selectedId]);

  const operations = React.useMemo(
    () => ({
      nextRow: () => {
        dispatch({ type: "move_row", payload: { rowIndex: state.rowIndex + 1 } });
      },
      prevRow: () => {
        dispatch({ type: "move_row", payload: { rowIndex: state.rowIndex - 1 } });
      },
      filterTodo: () => {
        dispatch({ type: "change_condition", payload: { isTodo: !state.condition.isTodo } });
      },
      filterStarred: () => {
        dispatch({ type: "change_condition", payload: { isStarred: !state.condition.isStarred } });
      },
    }),
    [state]
  );

  const immutableOperations = React.useMemo(
    () => ({
      filterAuthor: (authors: string[]) => {
        dispatch({ type: "change_condition", payload: { authors } });
        setAuthorFilter(false);
      },
      filterClear: () => {
        dispatch({ type: "change_condition", payload: initialCondition });
      },
      changeCondition: (requestCondition) => {
        dispatch({ type: "change_condition", payload: requestCondition });
      },
      changeSorter: (requestSorter) => {
        dispatch({ type: "change_sorter", payload: requestSorter });
      },
      changePager: (requestPager) => {
        dispatch({ type: "change_pager", payload: requestPager });
      },
      nextPage: () => {
        dispatch({ type: "next_page" });
      },
      prevPage: () => {
        dispatch({ type: "prev_page" });
      },
    }),
    []
  );

  const value = React.useMemo(
    () => ({
      ...state,
      ...operations,
      ...immutableOperations,
      ...modeOperations,
      isAuthorFilter,
      itemEvent,
      loadMedia,
      syncAll,
      isSelected,
      add,
      setItemEvent,
    }),
    [
      state,
      operations,
      immutableOperations,
      modeOperations,
      isAuthorFilter,
      itemEvent,
      loadMedia,
      syncAll,
      isSelected,
      add,
      setItemEvent,
    ]
  );

  return (
    <ListContext.Provider value={value}>
      {contextHolder}
      {children}
    </ListContext.Provider>
  );
};

export { ListProvider };

export default ListContext;
