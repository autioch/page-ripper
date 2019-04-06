import React from 'react';
import { connect } from 'react-redux';
import ImageItemView from './item/view';
import './styles.scss';

const mapStateToProps = (state) => state.images || {
  images: []
};

const ImageListView = ({ images }) => (
  <div className="image-list">
    {images.map((image) => <ImageItemView key={image.id} image={image}/>)}
  </div>
);

const ImageListViewConnected = connect(
  mapStateToProps
)(ImageListView);

export default ImageListViewConnected;
