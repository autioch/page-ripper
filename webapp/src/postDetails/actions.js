import axios from 'axios';
import { POST_DETAILS_SET, POST_DETAILS_LOADING, POST_DETAILS_TOGGLE } from './actionTypes';

export function setPostDetails(details) {
  return {
    type: POST_DETAILS_SET,
    details: Object.entries({
      url: details.url,
      ...details.postInfo
    }).sort((a, b) => a[0].localeCompare(b[0]))
  };
}

export function togglePostDetails(isExpanded) {
  return {
    type: POST_DETAILS_TOGGLE,
    isExpanded
  };
}

export function setPostDetailsLoading(isLoading) {
  return {
    type: POST_DETAILS_LOADING,
    isLoading
  };
}

export function fetchPostDetails(postId) {
  return (dispatch) => {
    dispatch(setPostDetails({}));
    dispatch(setPostDetailsLoading(true));

    return axios
      .get(`http://localhost:9090/post/${postId}`)
      .then(({ data }) => {
        dispatch(setPostDetailsLoading(false));
        dispatch(setPostDetails(data));
      });
  };
}
