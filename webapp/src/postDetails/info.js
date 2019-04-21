import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ postDetails: { details = {} } }) => ({
  label: details.length ? details.find((item) => item[0] === 'title')[1] : 'Select post from the left'
});

const InfoView = ({ label }) => (
  <div className="post-details-info">
    <div className="post-details-info-content">{label}</div>
  </div>
);

const InfoViewConnected = connect(
  mapStateToProps
)(InfoView);

export default InfoViewConnected;
