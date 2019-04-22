import React, { Component } from 'react';
import { connect } from 'react-redux';
import OptionsView from './options/view';
import LoaderView from '../../components/loader/view';

import './styles.scss';

const mapStateToProps = (state, ownProps) => ({
  fullId: `http://localhost:9090/image/${state.postList.selectedId}/${ownProps.image.id}`,
  postId: state.postList.selectedId
});

class ImageItemView extends Component {
  constructor(props) {
    super(props);

    this.loadCallback = this.loadCallback.bind(this);

    this.state = {
      isLoading: true
    };
  }

  loadCallback() {
    this.setState({
      isLoading: false
    });
  }

  render() {
    const { fullId, postId, dimensions, image } = this.props;

    return (
      <div className="image-item" style={dimensions}>
        <img
          className="image-item__el"
          src={fullId}
          alt=""
          onLoad={this.loadCallback}
          onError={this.loadCallback}
        />
        <LoaderView isLoading={this.state.isLoading} />
        <OptionsView image={image} postId={postId}/>
      </div>
    );
  }
}

const ImageItemViewConnected = connect(
  mapStateToProps
)(ImageItemView);

export default ImageItemViewConnected;
