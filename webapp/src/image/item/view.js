import React from 'react';
import './styles.scss';

const ImageItemView = ({ postId, image, dimensions = {} }) => (
  <div className="image-item" style={dimensions}>
    <img className="image-item__el" src={`http://localhost:9090/image/${postId}/${image}`} alt="" />
    <div className="image-item__options">
      <div className="image-item__option">
        <a target="_blank" rel="noopener noreferrer" href={`http://localhost:9090/image/${postId}/${image}`}>{'>'}</a>
      </div>
    </div>
  </div>
);

export default ImageItemView;
