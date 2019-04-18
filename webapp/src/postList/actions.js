import axios from 'axios';
import { POST_SELECT, POST_LIST_SET, POST_LIST_LOADING, POST_LIST_TOGGLE } from './actionTypes';

export function selectPost(selectedId) {
  return {
    type: POST_SELECT,
    selectedId
  };
}

export function setPostList(items) {
  return {
    type: POST_LIST_SET,
    items
  };
}

export function togglePostList(isExpanded) {
  return {
    type: POST_LIST_TOGGLE,
    isExpanded
  };
}

export function setPostListLoading(isLoading) {
  return {
    type: POST_LIST_LOADING,
    isLoading
  };
}

export function fetchPostList() {
  return (dispatch) => {
    dispatch(setPostListLoading(true));

    return axios
      .get(`http://localhost:9090/post`)
      .then(({ data }) => {
        dispatch(setPostListLoading(false));
        dispatch(setPostList(data));
      });
  };
}