import axios from 'axios';
import { IMAGE_LIST_SET, IMAGE_LIST_FETCH, IMAGE_HIDE } from './actionTypes';

export function setImageList(items) {
  return {
    type: IMAGE_LIST_SET,
    items
  };
}

export function setImageListLoading(isLoading) {
  return {
    type: IMAGE_LIST_FETCH,
    isLoading
  };
}

export function fetchImageList(postId) {
  return (dispatch) => {
    dispatch(setImageListLoading(true));

    return axios
      .get(`http://localhost:9090/image/${postId}`)
      .then(({ data }) => {
        dispatch(setImageListLoading(false));
        dispatch(setImageList(data));
      });
  };
}

export function hideImage(imageId) {
  return {
    type: IMAGE_HIDE,
    imageId
  };
}
