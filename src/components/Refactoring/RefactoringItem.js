import React from 'react';
import { locateRefactoringApplication } from '../../refactoringsCreation/refactoringApplicationLocator';
import { Link } from '../Button/Button';
import itemStyle from './RefactoringItem.module.css';

export const RefactoringItem = ({ refactoringClass }) => {
  const refactoringApplication = new (locateRefactoringApplication(
    refactoringClass.name
  ))(new refactoringClass());

  return (
    <Link
      to={refactoringApplication.next().view}
      onClick={() => refactoringApplication.goNext()}
      props={{ refactoringApplication }}
    >
      <div className={itemStyle.refactoring}>
        <img
          className={itemStyle.thumbnail}
          src={chrome.runtime.getURL('resources/placeholder.jpg')}
        />
        <p className={itemStyle.name}>{refactoringClass.asString()}</p>
      </div>
    </Link>
  );
};
