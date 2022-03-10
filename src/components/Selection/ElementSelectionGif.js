/*global chrome*/

import React from 'react';
import elementSelectionGifStyle from './ElementSelectionGif.css';

const ElementSelectionGif = () => (
  <img
    className={elementSelectionGifStyle.gif}
    src={chrome.runtime.getURL('resources/selection.gif')}
  />
);

export default ElementSelectionGif;