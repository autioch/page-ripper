import React from 'react';
import { connect } from 'react-redux';
import { selectPost } from '../../actions';

import './styles.scss';

const mapStateToProps = (state, ownProps) => ({
  isActive: ownProps.post.id === state.postList.selectedId
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(selectPost(ownProps.post.id));
  }
});

const PostItemView = ({ post, style, isActive, onClick }) => (
  <div className={`post-list-item ${isActive ? 'is-active' : ''}`} style={style} onClick={onClick} title={post.title}>
    {post.title}
  </div>
);

const PostItemViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItemView);

export default PostItemViewConnected;
