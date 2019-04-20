import {
  POST_SELECT, POST_LIST_SET, POST_LIST_LOADING,
  POST_LIST_TOGGLE,
  POST_LIST_NEXT, POST_LIST_PREV,
  POST_LIST_FILTER_VALUE
} from './actionTypes';

const keepInRange = (value, min, max) => Math.max(min, Math.min(value, max));

/* TODO items should be a dict? visibleItems should be an array of ids? */
const initialState = {
  items: [],
  visibleItems: [],
  selectedId: null,
  isLoading: false,
  isExpanded: true,
  filterValue: ''
};

function getNextIndex({ items, selectedId }, change = 1) {
  if (!selectedId) {
    return 0;
  }

  const currentIndex = items.findIndex((item) => item.id === selectedId);
  const nextIndex = keepInRange(currentIndex + change, 0, items.length - 1);

  return nextIndex;
}

function getVisibleItems(items, filterValue) {
  if (!filterValue) {
    return items.slice();
  }

  const lowerCaseFilter = filterValue.toLowerCase();

  return items.filter((item) => item.title.toLowerCase().includes(lowerCaseFilter));
}

const NEXT_CHANGE = 1;
const PREV_CHANGE = -1;

export default function postListReducer(state = initialState, action) {
  switch (action.type) {
    case POST_LIST_NEXT:
      return {
        ...state,
        selectedId: state.items[getNextIndex(state, NEXT_CHANGE)].id
      };
    case POST_LIST_PREV:
      return {
        ...state,
        selectedId: state.items[getNextIndex(state, PREV_CHANGE)].id
      };
    case POST_SELECT:
      return {
        ...state,
        selectedId: action.selectedId
      };
    case POST_LIST_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case POST_LIST_TOGGLE:
      return {
        ...state,
        isExpanded: action.isExpanded === undefined ? !state.isExpanded : action.isExpanded
      };
    case POST_LIST_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.filterValue,
        visibleItems: getVisibleItems(state.items, action.filterValue)
      };
    case POST_LIST_SET:
      return {
        ...state,
        items: action.items,
        visibleItems: getVisibleItems(action.items, state.filterValue)
      };
    default:
      return state;
  }
}
