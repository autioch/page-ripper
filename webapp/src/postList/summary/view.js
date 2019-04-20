import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';

const mapStateToProps = (state) => ({
  visibleCount: state.postList.visibleItems.length,
  totalCount: state.postList.items.length
});

const PostListSummaryView = ({ visibleCount, totalCount }) => (
  <div className="post-list-summary">
    {visibleCount} / {totalCount}
  </div>
);

const TogglePostListViewConnected = connect(
  mapStateToProps
)(PostListSummaryView);

export default TogglePostListViewConnected;
