/*global chrome*/

import ReactDOM from 'react-dom';
import React from 'react';
import Main from './components/Main/Main';
import style from './index.module.css';
import './content.css';
import RefactoringManager from './storage/RefactoringManager';

const app = document.createElement('div');
app.id = 'ux-painter-root';
app.className = `${style.root} ${style.opened}`;
document.body.appendChild(app);
window.refactoringManager = new RefactoringManager();

window.refactoringManager.executeCurrentVersion();

ReactDOM.render(<Main />, app);

app.style.display = 'none';
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    toggle();
  }
});

function toggle() {
  if (app.style.display === 'none') {
    app.style.display = 'block';
  } else {
    app.style.display = 'none';
  }
}

// mutation observer
function callback() {
  window.refactoringManager.executeCurrentVersion();
}

var observerOptions = {
  childList: true,
  attributes: true,
  subtree: true, //Omita o ponga false si no quiere controlar los cambios en los hijos
};

var observer = new MutationObserver(callback);
observer.observe(document.body, observerOptions);
