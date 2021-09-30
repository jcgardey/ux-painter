import React, { useState } from 'react';
import { useFrame } from 'react-frame-component';
import controlStyles from './WindowControl.module.css';
import stylesRoot from '../index.module.css';

const WindowControl = () => {
  const [hidden, setHidden] = useState(false);

  const frame = useFrame();

  const toggleView = () => {
    const root = document.querySelector('#ux-painter-root');
    const container = frame.document.querySelector('#main-content');
    container.style.display = !hidden ? 'none' : '';
    root.classList.toggle(stylesRoot.opened);
    root.classList.toggle(stylesRoot.closed);
    setHidden(!hidden);
  };

  return (
    <a className={controlStyles.control} onClick={toggleView}>
      <i
        className={
          hidden
            ? 'far fa-caret-square-down fa-lg'
            : 'far fa-caret-square-up fa-lg'
        }
      ></i>
    </a>
  );
};

export default WindowControl;
