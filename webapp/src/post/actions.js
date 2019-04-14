import axios from 'axios';
import { POST_SELECT, POST_LIST_SET, POST_LIST_FETCH } from './actionTypes';

export function selectPost(selectedId) {
  return {
    type: POST_SELECT,
    selectedId
  };
}

export function setPostList(list) {
  return {
    type: POST_LIST_SET,
    list
  };
}

export function fetchPostList(isLoading) {
  return {
    type: POST_LIST_FETCH,
    isLoading
  };
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch(fetchPostList(true));

    return axios
      .get(`http://localhost:9090/post`)
      .then(({ data }) => {
        dispatch(fetchPostList(false));
        dispatch(setPostList(data));
      });
  };
}
