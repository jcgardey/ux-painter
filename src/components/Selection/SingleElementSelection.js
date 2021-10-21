import React, { useState } from 'react';
import PageSelector from './PageSelector';
import XPathInterpreter from '../../utils/XPathInterpreter';
import ElementSelectionGif from './ElementSelectionGif';
import style from './SingleElementSelection.css';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';

export const SingleElementSelection = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;

  const [errorInSelection, setErrorInSelection] = useState(false);
  const [elementSelected, setElementSelected] = useState(
    refactoring.getElement() !== null
  );

  const onElementSelection = (elementSelected) => {
    if (refactoring.getElement()) {
      pageSelector.removeSelectionClass(
        refactoring.getElement(),
        pageSelector.selectionClass
      );
    } else {
      setElementSelected(true);
    }
    const elementXpath = new XPathInterpreter().getPath(
      elementSelected,
      document.body
    )[0];
    refactoring.setElementXpath(elementXpath);
    refactoring.setElement(elementSelected);
    pageSelector.addSelectionClass(
      elementSelected,
      pageSelector.selectionClass
    );
  };

  const pageSelector = new PageSelector();
  pageSelector.enableElementSelection({
    targetElementSelector: refactoring.targetElements(),
    onElementSelection: onElementSelection,
  });
  pageSelector.preventDomElementsBehaviour();

  const disableElementSelection = () =>
    pageSelector.restoreDomElementsBehaviour();

  const back = () => {
    disableElementSelection();
    pageSelector.removeSelectedElementsHighlighting();
    return true;
  };

  const next = () => {
    if (elementSelected) {
      disableElementSelection();
    } else {
      setErrorInSelection(true);
    }
    return elementSelected;
  };

  return (
    <>
      <RefactoringApplicationSteps
        refactoringApplication={refactoringApplication}
        onBack={back}
        onNext={next}
      >
        {elementSelected && (
          <p className={style.success}>
            Done! change the selection or continue to the next step
          </p>
        )}
        {errorInSelection && (
          <p className={style.error}>Element must be selected to continue</p>
        )}
        <ElementSelectionGif />
      </RefactoringApplicationSteps>
    </>
  );
};
