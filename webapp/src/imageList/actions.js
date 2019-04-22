import axios from 'axios';
import {
  IMAGE_LIST_SET, IMAGE_LIST_FETCH, IMAGE_TOGGLE,
  IMAGE_HIDE,
  IMAGE_VIEWER_OPEN, IMAGE_VIEWER_CLOSE,
  IMAGE_VIEWER_NEXT, IMAGE_VIEWER_PREV
} from './actionTypes';

export function openViewer(imageId) {
  return {
    type: IMAGE_VIEWER_OPEN,
    imageId
  };
}

export function closeViewer() {
  return {
    type: IMAGE_VIEWER_CLOSE
  };
}

export function viewerNextImage() {
  return {
    type: IMAGE_VIEWER_NEXT
  };
}

export function viewerPrevImage() {
  return {
    type: IMAGE_VIEWER_PREV
  };
}

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
