import React from 'react';
import { connect } from 'react-redux';
import ToolboxView from './toolbox/view';
import ListView from './list/view';
import './styles.scss';

const mapStateToProps = (state) => state.postList;

const PostListView = ({ isExpanded }) => {
  if (!isExpanded) {
    return '';
  }

  return (
    <div className="post-list">
      <ToolboxView />
      <ListView />
    </div>
  );
};

const PostListViewConnected = connect(
  mapStateToProps
)(PostListView);

export default PostListViewConnected;
