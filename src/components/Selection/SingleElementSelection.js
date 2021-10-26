import React, { useState, useEffect } from 'react';
import XPathInterpreter from '../../utils/XPathInterpreter';
import ElementSelectionGif from './ElementSelectionGif';
import style from './SingleElementSelection.css';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { usePageSelector } from '../../context/PageSelectorContext';

export const SingleElementSelection = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;

  const pageSelector = usePageSelector();

  const [errorInSelection, setErrorInSelection] = useState(false);
  const [elementSelected, setElementSelected] = useState(
    refactoring.getElement() !== null
  );

  useEffect(() => {
    if (refactoring.getElement()) {
      pageSelector.addSelectionClass(
        refactoring.getElement(),
        pageSelector.selectionClass
      );
    }
    pageSelector.enableElementSelection({
      targetElementSelector: refactoring.targetElements(),
      onElementSelection: onElementSelection,
    });
    pageSelector.preventDomElementsBehaviour();
  }, []);

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

  const disableElementSelection = () =>
    pageSelector.restoreDomElementsBehaviour();

  const back = () => {
    disableElementSelection();
    pageSelector.removeSelectedElementsHighlighting();
    return true;
  };

  const next = () => {
    elementSelected ? disableElementSelection() : setErrorInSelection(true);
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
