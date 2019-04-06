import React from 'react';
import './styles.scss';

const ImageItemView = ({ image: { url } }) => (
  <div className="image-item">
    <img className="image-item__el" src={url} alt="" />
  </div>
);

export default ImageItemView;
