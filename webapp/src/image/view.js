import React from 'react';
import { connect } from 'react-redux';
import ItemView from './item/view';
import getDimensions from './getDimensions';
import './styles.scss';

const mapStateToProps = (state) => ({
  list: state.images.list,
  isLoading: state.images.isLoading,
  postId: state.posts.selectedId
});

const ImageListView = ({ list, isLoading, postId }) => {
  const dimensions = getDimensions(list.length);

  return (
    <div className="image-list">
      {isLoading ? <div>Loading...</div> : ''}
      {isLoading || list.length ? '' : <div>No images in post</div>}
      {isLoading ? '' : list.map((img) => <ItemView key={img} image={img} postId={postId} dimensions={dimensions}/>)}
    </div>
  );
};

const ImageListViewConnected = connect(
  mapStateToProps
)(ImageListView);

export default ImageListViewConnected;
