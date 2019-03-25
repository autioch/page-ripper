import { combineReducers, createStore } from 'redux'

export const POST_SELECT = 'POST_SELECT';
export const POST_SET_LIST = 'POST_SET_LIST';

export function selectPost(postId) {
  return { type: POST_SELECT, postId }
}

export function setPostList(posts) {
  return { type: POST_SET_LIST, posts }
}

const initialState = {
  posts: [],
  postId: null
}

function posts(state = initialState, action) {
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



const ripperApp = combineReducers({
  posts
})

const store = createStore(ripperApp);

// https://redux.js.org/basics/usage-with-react
