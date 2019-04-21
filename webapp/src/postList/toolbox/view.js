import React from 'react';
import FilterView from './filter/view';
import SummaryView from './summary/view';
import './styles.scss';

const PostListToolboxView = () => (
  <div className="post-list-toolbox">
    <FilterView />
    <SummaryView />
  </div>
);

export default PostListToolboxView;
