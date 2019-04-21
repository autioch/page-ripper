/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import OptionsView from './options/view';

import './styles.scss';

const mapStateToProps = (state, ownProps) => ({
  fullId: `http://localhost:9090/image/${state.postList.selectedId}/${ownProps.image.id}`
});

const ImageItemView = ({ fullId, dimensions, image }) => (
  <div className="image-item" style={dimensions}>
    <img className="image-item__el" src={fullId} alt="" />
    <OptionsView image={image} />
  </div>
);

const ImageItemViewConnected = connect(
  mapStateToProps
)(ImageItemView);

export default ImageItemViewConnected;
