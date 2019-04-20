/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import PostItemView from './item/view';
import FilterView from './filter/view';
import SummaryView from './summary/view';
import { AutoSizer, List } from 'react-virtualized';
import './styles.scss';

const mapStateToProps = (state) => state.postList;

const PostListView = ({ visibleItems, isLoading, isExpanded }) => {
  if (!isExpanded) {
    return '';
  }

  return (
    <div className="post-list-container">
      <FilterView />
      <div className="post-list">
        {isLoading ? <div>Loading...</div> : <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={visibleItems.length}
              rowHeight={30}
              rowRenderer={({ index, style }) => <PostItemView style={style} key={visibleItems[index].id} post={visibleItems[index]}/>}
              width={width}
            />
          )}
        </AutoSizer> }
      </div>
      <SummaryView />
    </div>
  );
};

const PostListViewConnected = connect(
  mapStateToProps
)(PostListView);

export default PostListViewConnected;
