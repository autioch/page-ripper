import React from 'react';
import { connect } from 'react-redux';
import { nextPost } from '../actions';
import MenuItem from '../../components/menuItem/view';
import { Icon } from 'antd';

const mapStateToProps = () => ({
  label: <Icon type="right"/>
});

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(nextPost())
});

const NextView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem);

export default NextView;
