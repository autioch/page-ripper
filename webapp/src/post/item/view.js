import React from 'react';
import { connect } from 'react-redux';
import { selectPost } from '../actions';
import { fetchImages } from '../../image/actions';

import './styles.scss';

const mapStateToProps = (state, ownProps) => ({
  isActive: ownProps.post.id === state.posts.selectedId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(selectPost(ownProps.post.id));
    dispatch(fetchImages(ownProps.post.id));
  }
});

const PostItemView = ({ post, style, isActive, onClick }) => (
  <div className={`post-item ${isActive ? 'is-active' : ''}`} style={style} onClick={onClick} title={post.title}>
    {post.title}
  </div>
);

const PostItemViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItemView);

export default PostItemViewConnected;
