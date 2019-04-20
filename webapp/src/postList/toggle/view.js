import React from 'react';
import { connect } from 'react-redux';
import { togglePostList } from '../actions';
import './styles.scss';

const mapStateToProps = (state) => ({
  isExpanded: state.postList.isExpanded
});

const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch(togglePostList());
  }
});

const TogglePostListView = ({ isExpanded, onClick }) => (
  <div className={`toggle-section ${isExpanded ? 'is-expanded' : ''}`} onClick={onClick}>
    Post list
  </div>
);

const TogglePostListViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TogglePostListView);

export default TogglePostListViewConnected;
