import React from 'react';
import { connect } from 'react-redux';
import { setPostListFilterValue } from '../actions';
import './styles.scss';

const mapStateToProps = (state) => ({
  filterValue: state.postList.filterValue
});

const mapDispatchToProps = (dispatch) => ({
  setFilter(ev) {
    dispatch(setPostListFilterValue(ev.target.value));
  },
  reset() {
    dispatch(setPostListFilterValue(''));
  }
});

const PostListFilterView = ({ filterValue, setFilter, reset }) => (
  <div className="post-list-filter">
    <div className="post-list-filter__row">
      <input className="post-list-filter__input" type="text" onChange={setFilter} value={filterValue}/>
      <div className="post-list-filter__reset" onClick={reset}>X</div>
    </div>
  </div>
);

const PostListFilterViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListFilterView);

export default PostListFilterViewConnected;
