import { IMAGE_LIST_SET, IMAGE_LIST_FETCH } from './actionTypes';

const initialState = {
  list: [],
  isLoading: false
};

export default function posts(state = initialState, action) {
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
        list: action.list
      };
    default:
      return state;
  }
}
