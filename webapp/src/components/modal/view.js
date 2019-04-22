import React from 'react';
import ReactDOM from 'react-dom';
import IconView from '../icon/view';
import './styles.scss';

const Modal = ({ children, hide }) => ReactDOM.createPortal(
  <div className="c-modal">
    {children}
    <div className="c-modal__close">
      <IconView type="close" onClick={hide} title="Close modal"/>
    </div>
  </div>,
  document.body
);

export default Modal;
