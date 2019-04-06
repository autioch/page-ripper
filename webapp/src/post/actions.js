import { POST_SELECT, POST_SET_LIST } from './actionTypes';

export function selectPost(postId) {
  return {
    type: POST_SELECT,
    postId
  };
}

export function setPostList(posts) {
  return {
    type: POST_SET_LIST,
    posts
  };
}
