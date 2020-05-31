import * as React from "react";

import AppContext, { initialCondition, initialPager, initialSorter } from "~/contexts/AppContext";
import MediaContext from "~/contexts/MediaContext";
import { Condition, Pager, Sorter } from "~/types";

type Props = {
  children: React.ReactNode;
};

type State = {
  totalCount: number;
  condition: Condition;
  pager: Pager;
  sorter: Sorter;
};

type Action =
  | { type: "change_total_count"; payload: { totalCount: number } }
  | { type: "change_condition"; payload: Partial<Condition> }
  | { type: "change_sorter"; payload: Sorter }
  | { type: "change_pager"; payload: Pager }
  | { type: "next_page" }
  | { type: "prev_page" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "change_total_count":
      return { ...state, totalCount: action.payload.totalCount };
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

const noop = () => {
  // do noting
};

const ListContext = React.createContext<ContextType>({
  totalCount: 0,
  condition: initialCondition,
  pager: initialPager,
  sorter: initialSorter,
  isAuthorFilter: false,
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
  const { condition, sorter, pager, update } = React.useContext(AppContext);
  const { mediaCount } = React.useContext(MediaContext);
  const [isAuthorFilter, setAuthorFilter] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, {
    totalCount: mediaCount,
    condition,
    sorter,
    pager,
  });

  React.useEffect(() => {
    dispatch({
      type: "change_total_count",
      payload: { totalCount: mediaCount },
    });
  }, [mediaCount]);

  React.useEffect(() => {
    update({ condition: state.condition });
  }, [state.condition]);

  React.useEffect(() => {
    update({ sorter: state.sorter });
  }, [state.sorter]);

  React.useEffect(() => {
    update({ pager: state.pager });
  }, [state.pager]);

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
