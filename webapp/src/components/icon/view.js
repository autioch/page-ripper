import React from 'react';
import { Icon } from 'antd';
import './styles.scss';

const IconComponent = ({ onClick, type, title }) => (
  <div className="c-icon" onClick={onClick} title={title}>
    <Icon type={type}/>
  </div>
);

export default IconComponent;
