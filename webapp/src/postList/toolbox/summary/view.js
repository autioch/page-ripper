import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  visibleCount: state.postList.visibleItems.length,
  totalCount: state.postList.items.length
});

const PostListSummaryView = ({ visibleCount, totalCount }) => (
  <div className="post-list-toolbox-item">
    {visibleCount} / {totalCount} posts
  </div>
);

const TogglePostListViewConnected = connect(
  mapStateToProps
)(PostListSummaryView);

export default TogglePostListViewConnected;
