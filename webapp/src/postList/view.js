import React from 'react';
import { connect } from 'react-redux';
import PostItemView from './item/view';
import { AutoSizer, List } from 'react-virtualized';
import './styles.scss';

const mapStateToProps = (state) => state.postList;

const PostListView = ({ items, isLoading }) => (
  <div className="post-list">
    {isLoading ? <div>Loading...</div> : <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          rowCount={items.length}
          rowHeight={30}
          rowRenderer={({ index, style }) => <PostItemView style={style} key={items[index].id} post={items[index]}/>}
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
