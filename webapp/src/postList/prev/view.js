import React from 'react';
import { connect } from 'react-redux';
import { prevPost } from '../actions';
import './styles.scss';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch(prevPost());
  }
});

const PrevPostView = ({ onClick }) => (
  <div className="toggle-section is-expanded" onClick={onClick}>{'/\\'}</div>
);

const PrevPostViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrevPostView);

export default PrevPostViewConnected;
