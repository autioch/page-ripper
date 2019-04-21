import React from 'react';
import './styles.scss';

const MenuView = ({ children }) => (
  <div className="m-menu">
    <div className="m-menu-content">
      {children}
    </div>
  </div>
);

export default MenuView;
