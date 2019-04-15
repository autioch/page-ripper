import { POST_SELECT, POST_LIST_LOADING, POST_LIST_SET, POST_LIST_TOGGLE } from './actionTypes';

const initialState = {
  items: [],
  postId: null,
  isLoading: false
};

export default function postListReducer(state = initialState, action) {
  switch (action.type) {
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
        isExpanded: action.isExpanded
      };
    case POST_LIST_SET:
      return {
        ...state,
        items: action.items
      };
    default:
      return state;
  }
}
