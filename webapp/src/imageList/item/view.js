import React from 'react';
import { connect } from 'react-redux';
import { hideImage } from '../actions';

import './styles.scss';

const mapStateToProps = (state, ownProps) => ({
  fullId: `http://localhost:9090/image/${state.postList.selectedId}/${ownProps.image.id}`
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hide: () => dispatch(hideImage(ownProps.image.id))
});

const ImageItemView = ({ fullId, dimensions, hide }) => (
  <div className="image-item" style={dimensions}>
    <img className="image-item__el" src={fullId} alt="" />
    <div className="image-item__options">
      <div className="image-item__option" title="Hide image" onClick={hide} >H</div>
      <div className="image-item__option" title="Open in new window">
        <a target="_blank" rel="noopener noreferrer" href={fullId}>{'>'}</a>
      </div>
    </div>
  </div>
);

const ImageItemViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageItemView);

export default ImageItemViewConnected;
