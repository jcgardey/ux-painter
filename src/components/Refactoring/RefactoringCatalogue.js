import React, { useState } from 'react';
import 'tipr/tipr/tipr.css';
import { useRefactoringManager } from '../../hooks/useRefactoringManager';
import { RefactoringItem } from './RefactoringItem';
import refactoringCatalogueStyle from './RefactoringCatalogue.css';
import { FormField, Input } from '../Form/Form';

const $ = require('jquery');
//global.jQuery = $;
window.jQuery = $;
require('tipr');

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
          refactoring.asString().toLowerCase().includes(e.target.value)
        )
    );
  };

  return (
    <>
      <h2 className={refactoringCatalogueStyle.title}>
        Refactorings Catalogue
      </h2>
      <div className={refactoringCatalogueStyle.search}>
        <Input
          placeholder={'search refactoring'}
          className={refactoringCatalogueStyle.searchInput}
          onChange={onChange}
        />
        <i
          className={`fas fa-search ${refactoringCatalogueStyle.searchIcon}`}
        ></i>
      </div>
      <div className={refactoringCatalogueStyle.catalogue}>
        {refactorings.map((refactoringClass, i) => (
          <RefactoringItem refactoring={new refactoringClass()} />
        ))}
      </div>
    </>
  );
};

export default RefactoringCatalogue;
