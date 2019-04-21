import React from 'react';
import { connect } from 'react-redux';
import { prevPost } from '../actions';
import MenuItem from '../../components/menuItem/view';
import { Icon } from 'antd';

const mapStateToProps = () => ({
  label: <Icon type="left"/>
});

const mapDispatchToProps = (dispatch) => ({
  toggle: () => dispatch(prevPost())
});

const PrevView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItem);

export default PrevView;
