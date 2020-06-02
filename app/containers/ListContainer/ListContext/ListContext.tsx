import * as React from "react";

import AppContext, { initialCondition, initialPager, initialSorter } from "~/contexts/AppContext";
import { load, insertAll, add as addMedia } from "~/datastore/mediaStore";
import { MediaType, Media, Condition, Pager, Sorter } from "~/types";

type Props = unknown;

type State = {
  media: Media[];
  totalCount: number;
  condition: Condition;
  pager: Pager;
  sorter: Sorter;
};

type Action =
  | { type: "loaded_media"; payload: Pick<State, "media" | "totalCount"> }
  | { type: "change_condition"; payload: Partial<Condition> }
  | { type: "change_sorter"; payload: Sorter }
  | { type: "change_pager"; payload: Pager }
  | { type: "next_page" }
  | { type: "prev_page" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "loaded_media":
      return { ...state, ...action.payload };
    case "change_condition":
      return { ...state, condition: { ...state.condition, ...action.payload }, pager: { ...state.pager, current: 1 } };
    case "change_sorter":
      return { ...state, sorter: action.payload };
    case "change_pager":
      return { ...state, pager: action.payload };
    case "next_page": {
      const { size, current } = state.pager;
      const maxPage = Math.ceil(state.totalCount / size);
      if (current >= maxPage) return state;
      return { ...state, pager: { size, current: current + 1 } };
    }
    case "prev_page": {
      const { size, current } = state.pager;
      if (current <= 1) return state;
      return { ...state, pager: { size, current: current - 1 } };
    }
    default:
      return state;
  }
};

type ContextType = State & {
  isAuthorFilter: boolean;
  loadMedia: () => Promise<void>;
  sync: (mediaType: MediaType) => Promise<void>;
  add: (mediaType: MediaType, targetPath: string) => Promise<void>;
  toggleAuthorFilter: () => void;
  filterAuthor: (authors: string[]) => void;
  filterClear: () => void;
  filterTodo: () => void;
  filterStarred: () => void;
  changeSorter: (sorter: Sorter) => void;
  changePager: (pager: Pager) => void;
  nextPage: () => void;
  prevPage: () => void;
  showSearchForm: () => void;
  showVideoForm: () => void;
  showComicForm: () => void;
  showSettingForm: () => void;
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
  isAuthorFilter: false,
  loadMedia: asyncNoop,
  sync: asyncNoop,
  add: asyncNoop,
  toggleAuthorFilter: noop,
  filterAuthor: noop,
  filterClear: noop,
  filterTodo: noop,
  filterStarred: noop,
  changeSorter: noop,
  changePager: noop,
  nextPage: noop,
  prevPage: noop,
  showSearchForm: noop,
  showVideoForm: noop,
  showComicForm: noop,
  showSettingForm: noop,
});

const ListProvider: React.FC<Props> = ({ children }) => {
  const { condition, sorter, pager, update, getHomeDir } = React.useContext(AppContext);
  const [isAuthorFilter, setAuthorFilter] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, {
    media: [],
    totalCount: 0,
    condition,
    sorter,
    pager,
  });

  const loadMedia = async () => {
    const [data, count] = await load(state.condition, state.sorter, state.pager);

    dispatch({
      type: "loaded_media",
      payload: { media: data, totalCount: count as number },
    });
  };

  React.useEffect(() => {
    loadMedia();
    update({ condition: state.condition, sorter: state.sorter, pager: state.pager });
  }, [state.condition, state.sorter, state.pager]);

  const sync = async (mediaType) => {
    await insertAll(mediaType, getHomeDir(mediaType));
    loadMedia();
  };

  const add = async (mediaType, targetPath) => {
    await addMedia(mediaType, getHomeDir(mediaType), targetPath);
    await loadMedia();
  };

  const toggleAuthorFilter = () => {
    setAuthorFilter((val) => !val);
  };

  const filterAuthor = (authors: string[]) => {
    dispatch({ type: "change_condition", payload: { authors } });
    setAuthorFilter(false);
  };

  const filterClear = () => {
    dispatch({ type: "change_condition", payload: initialCondition });
  };

  const filterTodo = () => {
    dispatch({ type: "change_condition", payload: { isTodo: !state.condition.isTodo } });
  };

  const filterStarred = () => {
    dispatch({ type: "change_condition", payload: { isStarred: !state.condition.isStarred } });
  };

  const changeSorter = (requestSorter) => {
    dispatch({
      type: "change_sorter",
      payload: requestSorter,
    });
  };

  const changePager = (requestPager) => {
    dispatch({
      type: "change_pager",
      payload: requestPager,
    });
  };

  const nextPage = () => {
    dispatch({ type: "next_page" });
  };

  const prevPage = () => {
    dispatch({ type: "prev_page" });
  };

  const showSearchForm = () => {
    update({ mode: "search" });
  };

  const showVideoForm = () => {
    update({ mode: "video" });
  };

  const showComicForm = () => {
    update({ mode: "comic" });
  };

  const showSettingForm = () => {
    update({ mode: "setting" });
  };

  const value = {
    ...state,
    isAuthorFilter,
    loadMedia,
    sync,
    add,
    toggleAuthorFilter,
    filterAuthor,
    filterClear,
    filterTodo,
    filterStarred,
    changeSorter,
    changePager,
    nextPage,
    prevPage,
    showSearchForm,
    showVideoForm,
    showComicForm,
    showSettingForm,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export { ListProvider };

export default ListContext;
