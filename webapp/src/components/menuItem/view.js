import React from 'react';
import './styles.scss';

const noop = () => {}; // eslint-disable-line no-empty-function

const ToggleView = ({ isExpanded, toggle = noop, label }) => (
  <div className={`c-menu-item ${isExpanded ? 'is-expanded' : ''}`} onClick={toggle}>
    {label}
  </div>
);

export default ToggleView;
