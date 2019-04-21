import React from 'react';
import { connect } from 'react-redux';
import ItemView from './item/view';
import LoaderView from '../components/loader/view';

import './styles.scss';

const mapStateToProps = (state) => state.postDetails;

const PostDetailsView = ({ isExpanded, details = [], isLoading }) => {
  if (!isExpanded) {
    return '';
  }

  return (
    <div className="post-details">
      <div className="post-details-content">
        <LoaderView isLoading={isLoading} />
        {isLoading ? '' : details.map((detail) => <ItemView key={detail[0]} detail={detail} />)}
      </div>
    </div>
  );
};

const PostDetailsViewConnected = connect(
  mapStateToProps
)(PostDetailsView);

export default PostDetailsViewConnected;
