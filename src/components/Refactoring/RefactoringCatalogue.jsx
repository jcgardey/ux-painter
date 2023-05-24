import React, { useState } from 'react';
import { useRefactoringManager } from '../../hooks/useRefactoringManager';
import { RefactoringItem } from './RefactoringItem';
import style from './RefactoringCatalogue.module.css';
import { FormField, Input } from '../Form/Form';

const RefactoringCatalogue = () => {
  const manager = useRefactoringManager();

  const [refactorings, setRefactorings] = useState(
    manager.getRefactoringCatalogue()
  );

  const onChange = (e) => {
    setRefactorings(
      manager
        .getRefactoringCatalogue()
        .filter((refactoring) =>
          refactoring
            .asString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
    );
  };

  return (
    <>
      <h2 className={style.title}>Refactorings Catalogue</h2>
      <div className={style.search}>
        <Input
          placeholder={'Search refactoring'}
          className={style.searchInput}
          onChange={onChange}
        />
        <i className={`fas fa-search fa-lg ${style.searchIcon}`}></i>
      </div>
      <div className={style.catalogue}>
        {refactorings.length == 0 && (
          <p className={style.searchMessage}>No refactorings found</p>
        )}
        {refactorings.map((refactoringClass, i) => (
          <RefactoringItem key={i} refactoringClass={refactoringClass} />
        ))}
      </div>
    </>
  );
};

export default RefactoringCatalogue;
