import React from 'react';
import { connect } from 'react-redux';
import { togglePostDetails } from '../actions';
import './styles.scss';

const mapStateToProps = (state) => ({
  isExpanded: state.postDetails.isExpanded
});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => dispatch(togglePostDetails())
});

const TogglePostDetailsView = ({ isExpanded, onClick }) => (
  <div className={`toggle-section ${isExpanded ? 'is-expanded' : ''}`} onClick={onClick}>
    Post details
  </div>
);

const TogglePostDetailsViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TogglePostDetailsView);

export default TogglePostDetailsViewConnected;
