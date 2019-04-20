import React from 'react';
import { connect } from 'react-redux';
import { toggleImageList } from '../actions';
import './styles.scss';

const mapStateToProps = (state) => ({
  isExpanded: state.imageList.isExpanded
});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(toggleImageList())
});

const TogglePostListView = ({ isExpanded, onClick }) => (
  <div className={`toggle-section ${isExpanded ? 'is-expanded' : ''}`} onClick={onClick}>
    Image list
  </div>
);

const TogglePostListViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TogglePostListView);

export default TogglePostListViewConnected;
