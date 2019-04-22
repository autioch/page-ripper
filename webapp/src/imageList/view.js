/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemView from './item/view';
import ImageViewer from './viewer/view';
import LoaderView from '../components/loader/view';
import ModalView from '../components/modal/view';
import getDimensions from './getDimensions';
import { closeViewer } from './actions';
import './styles.scss';

const mapStateToProps = (state) => ({
  items: state.imageList.items,
  visibleItems: state.imageList.visibleItems,
  isLoading: state.imageList.isLoading,
  isExpanded: state.imageList.isExpanded,
  postSelected: !!state.postList.selectedId,

  postListExpanded: state.postList.isExpanded,
  postDetailsExpanded: state.postDetails.isExpanded,
  viewerIsOpen: state.imageList.viewerIsOpen,
  postId: state.postList.selectedId
});

const mapDispatchToProps = (dispatch) => ({
  hideViewer: () => dispatch(closeViewer())
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
    }, () => this.setItemDimensions());
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

    const { postSelected, isLoading, visibleItems, items, viewerIsOpen, hideViewer, postId } = this.props;
    const hiddenCount = items.length - visibleItems.length;

    const isEmpty = postSelected && !isLoading && !visibleItems.length;
    const dimensions = {
      height: this.state.itemHeight,
      width: this.state.itemWidth
    };

    return (
      <div className="image-list" ref={this.el}>
        <LoaderView isLoading={isLoading} />
        {isEmpty ? <div className="image-list__info">No images in post ({hiddenCount} hidden)</div> : ''}
        {postSelected ? '' : <div className="image-list__info">Select post to browse images</div>}
        {isLoading ? '' : visibleItems.map((image) => <ItemView key={image.id} image={image} dimensions={dimensions}/>)}
        {viewerIsOpen ? <ModalView hide={hideViewer}>
          <ImageViewer postId={postId} />
        </ModalView> : ''}
      </div>
    );
  }
}

const ImageListViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageListView);

export default ImageListViewConnected;
