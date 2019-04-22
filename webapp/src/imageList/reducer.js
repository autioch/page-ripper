import {
  IMAGE_LIST_SET, IMAGE_LIST_FETCH, IMAGE_TOGGLE,
  IMAGE_HIDE,
  IMAGE_VIEWER_OPEN, IMAGE_VIEWER_CLOSE,
  IMAGE_VIEWER_NEXT, IMAGE_VIEWER_PREV
} from './actionTypes';

const initialState = {
  items: [],
  visibleItems: [],
  isLoading: false,
  isExpanded: true,
  viewerIsOpen: false,
  selectedId: null
};

function getVisibleItems(items) {
  return items.filter((image) => !image.isHidden);
}

function getNextIndex({ visibleItems, selectedId }, change = 1) {
  if (!selectedId) {
    return 0;
  }

  const currentIndex = visibleItems.findIndex((item) => item.id === selectedId);
  const suggestion = currentIndex + change;
  const maxSuggestion = visibleItems.length - 1;

  if (suggestion < 0) {
    return maxSuggestion;
  }
  if (suggestion > maxSuggestion) {
    return 0;
  }

  return suggestion;
}

const NEXT_CHANGE = 1;
const PREV_CHANGE = -1;

export default function imageListReducer(state = initialState, action) {
  switch (action.type) {
    case IMAGE_VIEWER_OPEN:
      return {
        ...state,
        viewerIsOpen: true,
        selectedId: action.imageId
      };
    case IMAGE_VIEWER_CLOSE:
      return {
        ...state,
        viewerIsOpen: false
      };
    case IMAGE_VIEWER_NEXT:
      return {
        ...state,
        selectedId: state.visibleItems[getNextIndex(state, NEXT_CHANGE)].id
      };
    case IMAGE_VIEWER_PREV:
      return {
        ...state,
        selectedId: state.visibleItems[getNextIndex(state, PREV_CHANGE)].id
      };
    case IMAGE_LIST_FETCH:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case IMAGE_LIST_SET:
      return {
        ...state,
        isLoading: false,
        items: action.items,
        visibleItems: getVisibleItems(action.items)
      };
    case IMAGE_TOGGLE:
      return {
        ...state,
        isExpanded: action.isExpanded === undefined ? !state.isExpanded : action.isExpanded
      };
    case IMAGE_HIDE:
      const newItems = state.items.map((image) => { // eslint-disable-line no-case-declarations
        if (image.id !== action.imageId) {
          return image;
        }

        return {
          ...image,
          isHidden: true
        };
      });

      return {
        ...state,
        items: newItems,
        visibleItems: getVisibleItems(newItems)
      };
    default:
      return state;
  }
}
