import React from 'react';
import { locateRefactoringApplication } from '../../refactoringsCreation/refactoringApplicationLocator';
import { Link } from '../Button/Button';
import style from './RefactoringItem.module.css';

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
      <div className={style.refactoring}>
        <img
          className={style.thumbnail}
          src={chrome.runtime.getURL('resources/placeholder.jpg')}
        />
        <p className={style.name}>{refactoringClass.asString()}</p>
      </div>
    </Link>
  );
};
