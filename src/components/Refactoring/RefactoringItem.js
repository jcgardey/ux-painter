import React from 'react';
import itemStyle from './RefactoringItem.css';

export const RefactoringItem = ({ refactoring }) => (
  <div className={itemStyle.refactoring}>
    <img
      className={itemStyle.thumbnail}
      src={chrome.runtime.getURL('resources/placeholder.jpg')}
    />
    <p className={itemStyle.name}>{refactoring.constructor.asString()}</p>
  </div>
);
