import { POST_SELECT, POST_SET_LIST } from './actionTypes';

const initialState = {
  posts: [],
  postId: null
};

export function posts(state = initialState, action) {
  switch (action.type) {
    case POST_SELECT:
      return {
        ...state,
        postId: action.postId
      };
    case POST_SET_LIST:
      return {
        ...state,
        posts: action.posts
      };
    default:
      return state;
  }
}
