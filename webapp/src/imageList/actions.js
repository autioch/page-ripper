import axios from 'axios';
import { IMAGE_LIST_SET, IMAGE_LIST_FETCH, IMAGE_HIDE, IMAGE_TOGGLE } from './actionTypes';

export function setImageList(items) {
  return {
    type: IMAGE_LIST_SET,
    items
  };
}

export function toggleImageList(isExpanded) {
  return {
    type: IMAGE_TOGGLE,
    isExpanded
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
    dispatch(setImageList([]));
    dispatch(setImageListLoading(true));

    return axios
      .get(`http://localhost:9090/image/${postId}`)
      .then(({ data }) => {
        dispatch(setImageListLoading(false));
        dispatch(setImageList(data));
      });
  };
}

export function hideImage({ postId, imageId }) {
  axios.get(`http://localhost:9090/image/${postId}/${imageId}/hide`);

  return {
    type: IMAGE_HIDE,
    imageId
  };
}
