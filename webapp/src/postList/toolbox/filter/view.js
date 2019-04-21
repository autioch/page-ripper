import React from 'react';
import { connect } from 'react-redux';
import { setPostListFilterValue } from '../../actions';
import { Icon } from 'antd';
import './styles.scss';

const mapStateToProps = (state) => ({
  filterValue: state.postList.filterValue,
  isFiltered: state.postList.filterValue.length > 0
});

const mapDispatchToProps = (dispatch) => ({
  setFilter(ev) {
    dispatch(setPostListFilterValue(ev.target.value));
  },
  reset() {
    dispatch(setPostListFilterValue(''));
  }
});

const ResetButton = ({ reset }) => (
  <div className="post-list-filter__reset" onClick={reset} >
    <Icon type="close" style={{
      color: '#3a3'
    }} />
  </div>
);

const PostListFilterView = ({ isFiltered, filterValue, setFilter, reset }) => (
  <div className="post-list-toolbox-item">
    <div className="post-list-filter__input-container">
      <input
        className="post-list-filter__input"
        placeholder="Filter by title..."
        type="text"
        onChange={setFilter}
        value={filterValue}
      />
    </div>
    {isFiltered ? <ResetButton reset={reset} /> : ''}
  </div>
);

const PostListFilterViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListFilterView);

export default PostListFilterViewConnected;
