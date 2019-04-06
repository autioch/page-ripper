import { POST_SELECT, POST_FETCH_LIST, POST_SET_LIST } from './actionTypes';

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
    case POST_FETCH_LIST:
      return {
        ...state,
        isLoading: true
      };
    case POST_SET_LIST:
      return {
        ...state,
        isLoading: false,
        list: action.list
      };
    default:
      return state;
  }
}
