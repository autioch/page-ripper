import axios from 'axios';
import { IMAGE_LIST_SET, IMAGE_LIST_FETCH } from './actionTypes';

export function setImageList(list) {
  return {
    type: IMAGE_LIST_SET,
    list
  };
}

export function fetchImageList(isLoading) {
  return {
    type: IMAGE_LIST_FETCH,
    isLoading
  };
}

export function fetchImages(postId) {
  return (dispatch) => {
    dispatch(fetchImageList(true));

    return axios
      .get(`http://localhost:9090/image/${postId}`)
      .then(({ data }) => {
        dispatch(fetchImageList(false));
        dispatch(setImageList(data));
      });
  };
}
