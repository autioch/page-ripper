import { IMAGE_LIST_SET, IMAGE_LIST_FETCH, IMAGE_HIDE, IMAGE_TOGGLE } from './actionTypes';

const initialState = {
  items: [],
  isLoading: false,
  isExpanded: true
};

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
        items: action.items
      };
    case IMAGE_TOGGLE:
      return {
        ...state,
        isExpanded: action.isExpanded === undefined ? !state.isExpanded : action.isExpanded
      };
    case IMAGE_HIDE:
      return {
        ...state,
        items: state.items.map((image) => {
          if (image.id !== action.imageId) {
            return image;
          }

          return {
            ...image,
            isHidden: true
          };
        })
      };
    default:
      return state;
  }
}
