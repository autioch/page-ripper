import { IMAGE_LIST_SET, IMAGE_LIST_FETCH, IMAGE_HIDE, IMAGE_TOGGLE } from './actionTypes';

const initialState = {
  items: [],
  visibleItems: [],
  isLoading: false,
  isExpanded: true
};

function getVisibleItems(items) {
  return items.filter((image) => !image.isHidden);
}

export default function imageListReducer(state = initialState, action) {
  switch (action.type) {
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
