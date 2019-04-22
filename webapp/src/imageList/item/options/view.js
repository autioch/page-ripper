/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import { hideImage, openViewer } from '../../actions';
import { Icon } from 'antd';

import './styles.scss';

const mapStateToProps = (state, ownProps) => ({
  fullId: `http://localhost:9090/image/${state.postList.selectedId}/${ownProps.image.id}`,
  postId: state.postList.selectedId,
  imageId: ownProps.image.id
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hide: () => dispatch(hideImage({
    postId: ownProps.postId,
    imageId: ownProps.image.id
  })),
  view: () => dispatch(openViewer(ownProps.image.id))
});

const ImageItemView = ({ fullId, hide, view }) => (
  <div className="image-item__options">
    <a className="image-item__option" title="Open in new window" target="_blank" rel="noopener noreferrer" href={fullId}>
      <Icon type="double-right" />
    </a>
    <div className="image-item__option" title="Open image viewer" onClick={view}>
      <Icon type="fullscreen" />
    </div>
    <div className="image-item__option" title="Hide image" onClick={hide} >
      <Icon type="eye-invisible" />
    </div>
  </div>
);

const ImageItemViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageItemView);

export default ImageItemViewConnected;
