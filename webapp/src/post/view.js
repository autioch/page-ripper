import React from 'react';
import { connect } from 'react-redux';
import PostItemView from './item/view';
import { AutoSizer, List } from 'react-virtualized';
import './styles.scss';

const mapStateToProps = (state) => state.posts;

const PostListView = ({ list, isLoading }) => (
  <div className="post-list">
    {isLoading ? <div>Loading...</div> : <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          rowCount={list.length}
          rowHeight={24}
          rowRenderer={({ index, style }) => <PostItemView style={style} key={list[index].id} post={list[index]}/>}
          width={width}
        />
      )}
    </AutoSizer> }
  </div>
);

const PostListViewConnected = connect(
  mapStateToProps
)(PostListView);

export default PostListViewConnected;
