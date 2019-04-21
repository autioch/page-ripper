/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemView from './item/view';
import LoaderView from '../components/loader/view';
import getDimensions from './getDimensions';
import './styles.scss';

const mapStateToProps = (state) => ({
  items: state.imageList.items,
  isLoading: state.imageList.isLoading,
  isExpanded: state.imageList.isExpanded,
  postListExpanded: state.postList.isExpanded,
  postDetailsExpanded: state.postDetails.isExpanded,
  postSelected: !!state.postList.selectedId
});

const countVisible = (itemList) => itemList.filter((image) => !image.isHidden).length;

class ImageListView extends Component {
  constructor(props) {
    super(props);
    this.setMainDimensions = this.setMainDimensions.bind(this);
    this.el = React.createRef();
    this.state = {
      mainWidth: 0,
      mainHeight: 0,
      itemWidth: 0,
      itemHeight: 0
    };
  }

  componentDidMount() {
    this.setMainDimensions();
    this.setItemDimensions();
    window.addEventListener('resize', this.setMainDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setMainDimensions);
  }

  setMainDimensions() {
    if (!this.el.current) {
      return;
    }
    const rect = this.el.current.getBoundingClientRect();

    this.setState({
      mainWidth: rect.width,
      mainHeight: rect.height
    });
  }

  setItemDimensions() {
    const visibleCount = countVisible(this.props.items);
    const itemDimensions = getDimensions(visibleCount, this.state.mainWidth, this.state.mainHeight);

    this.setState({
      itemWidth: itemDimensions.width,
      itemHeight: itemDimensions.height
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevProps.postListExpanded !== this.props.postListExpanded) ||
      (prevProps.postDetailsExpanded !== this.props.postDetailsExpanded) ||
      (prevProps.isExpanded !== this.props.isExpanded) ||
      (prevState.mainWidth !== this.state.mainWidth) ||
      (prevState.mainHeight !== this.state.mainHeight)
    ) {
      this.setMainDimensions();

      return;
    }

    const prevCount = countVisible(prevProps.items);
    const newCount = countVisible(this.props.items);

    if (prevCount !== newCount) {
      this.setItemDimensions();
    }
  }

  render() {
    if (!this.props.isExpanded) {
      return '';
    }

    const { postSelected, isLoading } = this.props;
    const visibleList = this.props.items.filter((image) => !image.isHidden);
    const hiddenCount = this.props.items.length - visibleList.length;

    const isEmpty = postSelected && !isLoading && !visibleList.length;
    const dimensions = {
      height: this.state.itemHeight,
      width: this.state.itemWidth
    };

    return (
      <div className="image-list" ref={this.el}>
        <LoaderView isLoading={isLoading} />
        {isEmpty ? <div className="image-list__info">No images in post ({hiddenCount} hidden)</div> : ''}
        {postSelected ? '' : <div className="image-list__info">Select post to browse images</div>}
        {isLoading ? '' : visibleList.map((image) => <ItemView key={image.id} image={image} dimensions={dimensions}/>)}
      </div>
    );
  }
}

const ImageListViewConnected = connect(
  mapStateToProps
)(ImageListView);

export default ImageListViewConnected;
