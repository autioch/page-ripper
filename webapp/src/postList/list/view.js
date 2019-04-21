/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import PostItemView from './item/view';
import { AutoSizer, List } from 'react-virtualized';
import LoaderView from '../../components/loader/view';
import './styles.scss';

const mapStateToProps = (state) => state.postList;

const ListView = ({ isLoading, visibleItems }) => (
  <div className="post-list-list">
    <LoaderView isLoading={isLoading} />
    {isLoading ? '' : <AutoSizer>
      {({ height, width }) => (
        <List
          height={height}
          rowCount={visibleItems.length}
          rowHeight={24}
          rowRenderer={({ index, style }) => <PostItemView style={style} key={visibleItems[index].id} post={visibleItems[index]}/>}
          width={width}
        />
      )}
    </AutoSizer>
    }
  </div>
);

const ListViewConnected = connect(
  mapStateToProps
)(ListView);

export default ListViewConnected;
