import React, { useEffect, useState } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { AddButton, Controls, PrimaryButton } from '../Button/Button';
import { useRefactoringManager } from '../../hooks/useRefactoringManager';
import { REFACTORING_CATALOGUE, VERSION_LIST } from '../../routing/types';
import { usePageSelector } from '../../context/PageSelectorContext';
import { Input } from '../Form/Form.js';

export const AddTooltipPreview = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;
  const pageSelector = usePageSelector();

  const [inputColor, setInputColor] = useState(React.createRef());
  const [inputBackground, setInputBackground] = useState(React.createRef());

  const [aColor, setAColor] = useState('#FFFFFF');

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

  const color = () => {
    refactoring
      .getElement()
      .parentNode.firstChild.getElementsByTagName(
        'div'
      )[1].firstChild.style.color = inputColor.current.value;
  };

  const background = () => {
    setAColor(inputBackground.current.value);
    refactoring
      .getElement()
      .parentNode.firstChild.getElementsByTagName(
        'div'
      )[1].firstChild.style.background = inputBackground.current.value;
  };

  return (
    <RefactoringApplicationSteps
      refactoringApplication={refactoringApplication}
      onBack={back}
    >
      <h4 style={{ marginBottom: '5px' }}>Color</h4>
      <Input
        type={'color'}
        style={{ width: '92%' }}
        ref2={inputColor}
        onChange={color}
      ></Input>

      <br></br>
      <br></br>

      <h4 style={{ marginBottom: '5px' }}>Background</h4>
      <Input
        type={'color'}
        style={{ width: '92%' }}
        ref2={inputBackground}
        onChange={background}
        value={aColor}
      ></Input>

      <Controls>
        <PrimaryButton onClick={back} to={REFACTORING_CATALOGUE}>
          Cancel <i className="fas fa-times-circle"></i>
        </PrimaryButton>
        <AddButton onClick={refactor} to={VERSION_LIST}>
          Refactor <i className="fas fa-hammer fa-sm"></i>
        </AddButton>
      </Controls>
    </RefactoringApplicationSteps>
  );
};
