import React from 'react';
import { connect } from 'react-redux';
import ItemView from './item/view';

import './styles.scss';

const mapStateToProps = (state) => state.postDetails;

const PostDetailsView = ({ details = [], isLoading }) => (
  <div className="post-details">
    {isLoading ? <div>Loading...</div> : ''}
    {details.map((detail) => <ItemView key={detail[0]} detail={detail} />)}
  </div>
);

const PostDetailsViewConnected = connect(
  mapStateToProps
)(PostDetailsView);

export default PostDetailsViewConnected;
