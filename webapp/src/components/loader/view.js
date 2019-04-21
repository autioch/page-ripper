/* eslint-disable max-len */
import React from 'react';
import { Icon } from 'antd';
import './styles.scss';

const LoaderView = ({ isLoading }) => {
  if (!isLoading) {
    return '';
  }

  return (
    <div className="c-loader">
      <Icon type="loading" style={{
        fontSize: '60px'
      }}/>
    </div>
  );
};

export default LoaderView;
