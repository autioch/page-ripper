import React from 'react';
import { connect } from 'react-redux';
import { nextPost } from '../actions';
import './styles.scss';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch(nextPost());
  }
});

const NextPostView = ({ onClick }) => (
  <div className="toggle-section" onClick={onClick}>{'\\/'}</div>
);

const NextPostViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NextPostView);

export default NextPostViewConnected;
