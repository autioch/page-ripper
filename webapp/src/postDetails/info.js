/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';

const titleDetail = (details) => details.length ? details.find((item) => item[0] === 'title') : false; // eslint-disable-line no-confusing-arrow

const mapStateToProps = ({ postDetails: { details = [] } }) => {
  const title = titleDetail(details);

  return {
    label: title ? title[1] : 'Select post from the left'
  };
};

const InfoView = ({ label }) => (
  <div className="post-details-info">
    <div className="post-details-info-content">{label}</div>
  </div>
);

const InfoViewConnected = connect(
  mapStateToProps
)(InfoView);

export default InfoViewConnected;
