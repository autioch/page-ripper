import React from 'react';
import { connect } from 'react-redux';
import PostItemView from './item/view';
import './styles.scss';

const mapStateToProps = (state) => state.posts;

const PostListView = ({ posts }) => (
  <div className="post-list">
    {posts.map((post) => <PostItemView key={post.id} post={post}/>)}
  </div>
);

const PostListViewConnected = connect(
  mapStateToProps
)(PostListView);

export default PostListViewConnected;
