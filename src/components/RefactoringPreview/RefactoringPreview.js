import React, { useEffect } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { AddButton, Controls, PrimaryButton } from '../Button/Button';
import { useRefactoringManager } from '../../hooks/useRefactoringManager';
import { EDIT_VERSION, REFACTORING_CATALOGUE } from '../../routing/types';
import { usePageSelector } from '../../context/PageSelectorContext';
import { RefactoringStyle } from './RefactoringStyle';

const RefactoringPreview = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;

  const pageSelector = usePageSelector();

  useEffect(() => {
    if (refactoring.getElement) {
      pageSelector.removeSelectionClass(
        refactoring.getElement(),
        pageSelector.selectionClass
      );
    }
    refactoring.execute();
  }, []);

  const back = () => {
    refactoring.unDo();
    return true;
  };

  const manager = useRefactoringManager();

  const refactor = () => {
    refactoring.setURL(document.location.href);
    manager.addDirtyRefactoring(refactoring);
  };

  return (
    <RefactoringApplicationSteps
      refactoringApplication={refactoringApplication}
      onBack={back}
    >
      <RefactoringStyle refactoring={refactoring} />
      <Controls>
        <PrimaryButton onClick={back} to={REFACTORING_CATALOGUE}>
          Cancel <i className="fas fa-times-circle"></i>
        </PrimaryButton>
        <AddButton
          onClick={refactor}
          to={EDIT_VERSION}
          props={{ version: manager.getCurrentVersion() }}
        >
          Refactor <i className="fas fa-hammer fa-sm"></i>
        </AddButton>
      </Controls>
    </RefactoringApplicationSteps>
  );
};

export default RefactoringPreview;
