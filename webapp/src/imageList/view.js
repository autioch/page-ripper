import React from 'react';
import { connect } from 'react-redux';
import ItemView from './item/view';
import getDimensions from './getDimensions';
import './styles.scss';

const mapStateToProps = (state) => ({
  items: state.imageList.items,
  isLoading: state.imageList.isLoading
});

const ImageListView = ({ items, isLoading }) => {
  const visibleList = items.filter((image) => !image.isHidden);
  const dimensions = getDimensions(visibleList.length);

  return (
    <div className="image-list">
      {isLoading ? <div>Loading...</div> : ''}
      {isLoading || visibleList.length ? '' : <div>No images in post</div>}
      {isLoading ? '' : visibleList.map((image) => <ItemView key={image.id} image={image} dimensions={dimensions}/>)}
    </div>
  );
};

const ImageListViewConnected = connect(
  mapStateToProps
)(ImageListView);

export default ImageListViewConnected;
