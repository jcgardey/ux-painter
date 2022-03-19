import React, { useState } from 'react';
import { RefactoringApplicationSteps } from '../Application/RefactoringApplicationSteps';
import { FormField, Input } from '../Form/Form';

export const AddTooltip = ({ refactoringApplication }) => {
  const refactoring = refactoringApplication.refactoring;
  const [tooltipName, setTooltipName] = useState(refactoring.getTooltipName() || '');

  const onChange = (event) => {
    setTooltipName(event.target.value);
    refactoring.setTooltipName(event.target.value);
  };

  return (
    <RefactoringApplicationSteps
      refactoringApplication={refactoringApplication}
    >
      <FormField>
        <Input
          type={'text'}
          placeholder={''}
          onChange={onChange}
          value={tooltipName}
        />
      </FormField>
    </RefactoringApplicationSteps>
  );
};