import axios from 'axios';
import { POST_SELECT, POST_SET_LIST, POST_FETCH_LIST } from './actionTypes';

export function selectPost(selectedId) {
  return {
    type: POST_SELECT,
    selectedId
  };
}

export function setPostList(list) {
  return {
    type: POST_SET_LIST,
    list
  };
}

export function fetchPostsStart() {
  return {
    type: POST_FETCH_LIST
  };
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch(fetchPostsStart());

    return axios
      .get(`http://localhost:9090/post`)
      .then(({ data }) => dispatch(setPostList(data)));
  };
}
