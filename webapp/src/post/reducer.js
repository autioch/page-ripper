import { POST_SELECT, POST_LIST_FETCH, POST_LIST_SET } from './actionTypes';

const initialState = {
  list: [],
  postId: null,
  isLoading: false
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case POST_SELECT:
      return {
        ...state,
        selectedId: action.selectedId
      };
    case POST_LIST_FETCH:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case POST_LIST_SET:
      return {
        ...state,
        isLoading: false,
        list: action.list
      };
    default:
      return state;
  }
}
