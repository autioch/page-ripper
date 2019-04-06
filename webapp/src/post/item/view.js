import React from 'react';
import { connect } from 'react-redux';
import { selectPost } from '../actions';

import './styles.scss';

const mapStateToProps = (state, post) => ({
  active: post.id === state.selectedPostId
});

const mapDispatchToProps = (dispatch, post) => ({
  onClick: () => dispatch(selectPost(post.id))
});

const PostItemView = ({ post }) => (
  <div className="post-item">
    {post.title}
  </div>
);

const PostItemViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItemView);

export default PostItemViewConnected;
