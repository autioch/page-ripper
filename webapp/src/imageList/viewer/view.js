import React from 'react';
import { connect } from 'react-redux';
import { viewerNextImage, viewerPrevImage, hideImage } from '../actions';
import { Icon } from 'antd';
import IconView from '../../components/icon/view';
import './styles.scss';

const mapStateToProps = (state) => ({
  imageId: state.imageList.selectedId,
  fullId: `http://localhost:9090/image/${state.postList.selectedId}/${state.imageList.selectedId}`
});

const mapDispatchToProps = (dispatch) => ({
  next: () => dispatch(viewerNextImage()),
  prev: () => dispatch(viewerPrevImage()),
  hide: (postId, imageId) => dispatch(hideImage({
    postId,
    imageId
  }))
});

const ImageViewer = ({ fullId, imageId, prev, postId, hide, next }) => (
  <div className="image-viewer">
    <img
      className="image-viewer__el"
      src={fullId}
      alt=""
    />
    <div className="image-viewer__prev" onClick={prev}>
      <Icon type="left"/>
    </div>
    <div className="image-viewer__next" onClick={next}>
      <Icon type="right"/>
    </div>
    <div className="image-viewer__hide">
      <IconView type="eye-invisible" onClick={() => hide(postId, imageId)} title="Hide image"/>
    </div>
  </div>
);

const ImageViewerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageViewer);

export default ImageViewerConnected;
