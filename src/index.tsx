import { createRoot } from 'react-dom/client';
import React from 'react';
import Main from './components/Main/Main';
import './index.css';
//import './content.css';
//import RefactoringManager from './storage/RefactoringManager';

// Declare global chrome namespace for TypeScript
declare global {
  interface Window {
    //refactoringManager: RefactoringManager;
    chrome: typeof chrome;
  }
}

const app: HTMLDivElement = document.createElement('div');
app.id = 'ux-painter-root';
app.className =
  'w-1/3 h-full fixed top-0 right-0 bg-white shadow-lg border-l border-gray-300 z-9999 overflow-auto';
document.body.appendChild(app);

// Initialize the refactoring manager
//window.refactoringManager = new RefactoringManager();
//window.refactoringManager.executeCurrentVersion();

// Create React root and render the main component
const root = createRoot(app);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);

// Initially hide the app
app.style.display = 'none';

// Chrome extension message listener
chrome.runtime.onMessage.addListener(function (
  request: { message: string },
  _sender: chrome.runtime.MessageSender,
  _sendResponse: (response?: any) => void,
) {
  if (request.message === 'clicked_browser_action') {
    toggle();
  }
});

// Toggle app visibility
function toggle(): void {
  app.style.display = app.style.display === 'none' ? 'block' : 'none';
}

// Mutation observer callback
function callback(): void {
  //window.refactoringManager.executeCurrentVersion();
}

// Mutation observer options
const observerOptions: MutationObserverInit = {
  childList: true,
  attributes: true,
  subtree: true,
};

// Create and start the mutation observer
const observer = new MutationObserver(callback);
observer.observe(document.body, observerOptions);
