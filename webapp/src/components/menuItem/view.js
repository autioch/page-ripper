import React from 'react';
import './styles.scss';

const ToggleView = ({ isExpanded, toggle, label }) => (
  <div className={`c-menu-item ${isExpanded ? 'is-expanded' : ''}`} onClick={toggle}>
    {label}
  </div>
);

export default ToggleView;
